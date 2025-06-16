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
  console.log('--- Webhook function invoked ---');
  console.log('Request Headers:', req.headers);
  console.log('Webhook received:', req.method);

  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Para Vercel Serverless Functions, o body já deve estar parsed se o Content-Type for application/json
  // Se não estiver, pode ser necessário usar `await json(req)` como no create-checkout-session
  const event = req.body;

  // TODO: EM PRODUÇÃO, IMPLEMENTAR A VERIFICAÇÃO DE ASSINATURA 'x-sumup-signature' AQUI!
  // Exemplo (verifica a documentação SumUp para detalhes exatos):
  // const sig = req.headers['x-sumup-signature'];
  // const expectedSignature = calculateSumUpSignature(req.rawBody, process.env.SUMUP_WEBHOOK_SECRET);
  // if (sig !== expectedSignature) { return res.status(401).send('Invalid signature'); }

  console.log('Webhook Event:', event);

  if (event.event_type === 'checkout.status.updated') {
    const checkoutId = event.payload.checkout_id;
    console.log('Processing checkoutId from payload:', checkoutId);

    try {
        const accessToken = await getSumUpAccessToken();
        const checkoutDetailsResponse = await fetch(`https://api.sumup.com/v0.1/checkouts/${checkoutId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const checkoutDetails = await checkoutDetailsResponse.json();

        console.log('SumUp API Checkout Details Response (ok):', checkoutDetailsResponse.ok);
        console.log('SumUp API Checkout Details:', checkoutDetails);

        if (!checkoutDetailsResponse.ok) {
            console.error('Failed to retrieve checkout details:', checkoutDetails.message || 'Unknown error');
            return res.status(500).json({ error: 'Failed to retrieve checkout details' });
        }

        const { checkout_reference, transaction_id, amount, currency, status } = checkoutDetails;
        const processedStatus = String(status).trim();

        if (processedStatus === 'PAID') {
            const existingPurchase = await db.collection('purchases').doc(transaction_id).get();

            if (existingPurchase.exists) {
                console.log('Purchase with this transaction ID already exists. Skipping.');
                return res.json({ received: true });
            }

            const parts = checkout_reference.split('-');
            const buyerEmail = parts[2];

            await db.collection('purchases').doc(transaction_id).set({
                email: buyerEmail || '',
                courseId: parts[1],
                transactionId: transaction_id,
                amount: amount,
                currency: currency,
                purchasedAt: new Date(),
                status: processedStatus
            });
            console.log('Purchase saved to Firestore!');
        } else {
            console.log(`Transaction status is not PAID, it is: ${processedStatus}. Not saving to Firestore.`);
        }
    } catch (error) {
        console.error('Error processing SumUp webhook event:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.json({ received: true });
} 