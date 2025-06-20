import fetch from 'node-fetch';
import { json } from 'micro';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
    })
  });
}

const db = admin.firestore();

async function getSumUpAccessToken() {
  const tokenResponse = await fetch('https://api.sumup.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.SUMUP_CLIENT_ID,
      client_secret: process.env.SUMUP_CLIENT_SECRET
    }).toString()
  });

  const tokenData = await tokenResponse.json();
  if (!tokenResponse.ok) {
    throw new Error(tokenData.message || 'Failed to get SumUp access token');
  }
  return tokenData.access_token;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const event = req.body;

  if (event.event_type === 'checkout.status.updated') {
    const checkoutId = event.payload.checkout_id;

    try {
        const accessToken = await getSumUpAccessToken();
        const checkoutDetailsResponse = await fetch(`https://api.sumup.com/v0.1/checkouts/${checkoutId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const checkoutDetails = await checkoutDetailsResponse.json();

        if (!checkoutDetailsResponse.ok) {
            return res.status(500).json({ error: 'Failed to retrieve checkout details' });
        }

        const { checkout_reference, transaction_id, amount, currency, status } = checkoutDetails;
        const processedStatus = String(status).trim();

        if (processedStatus === 'PAID') {
            const existingPurchase = await db.collection('purchases').doc(transaction_id).get();

            if (existingPurchase.exists) {
                return res.json({ received: true });
            }

            const parts = checkout_reference.split('-');
            const buyerEmail = parts[2];
            const courseId = parts[1];

            await db.collection('purchases').doc(transaction_id).set({
                email: buyerEmail || '',
                courseId: courseId,
                transactionId: transaction_id,
                amount: amount,
                currency: currency,
                purchasedAt: new Date(),
                status: processedStatus
            });
            
            try {
                const courseRef = db.collection('courses').doc(courseId);
                const courseDoc = await courseRef.get();

                if (courseDoc.exists) {
                    const courseData = courseDoc.data();
                    await db.collection('mail').add({
                        to: buyerEmail,
                        message: {
                            subject: `Confirmação de Inscrição: ${courseData.title}`,
                            html: `
                                <h1>Olá!</h1>
                                <p>A sua inscrição na formação "${courseData.title}" foi confirmada com sucesso.</p>
                                <p>Em breve receberá mais informações sobre como aceder à formação.</p>
                                <p>Obrigado!</p>
                            `,
                        },
                    });
                } else {
                    console.error(`Course with ID ${courseId} not found.`);
                }
            } catch (emailError) {
                console.error('Error sending confirmation email:', emailError);
            }
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.json({ received: true });
} 