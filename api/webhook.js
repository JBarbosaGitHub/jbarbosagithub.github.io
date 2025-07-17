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
    console.log('Webhook received checkout.status.updated event for checkoutId:', checkoutId);

    try {
        const accessToken = await getSumUpAccessToken();
        const checkoutDetailsResponse = await fetch(`https://api.sumup.com/v0.1/checkouts/${checkoutId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const checkoutDetails = await checkoutDetailsResponse.json();

        if (!checkoutDetailsResponse.ok) {
            console.error('Failed to retrieve checkout details:', checkoutDetails);
            return res.status(500).json({ error: 'Failed to retrieve checkout details' });
        }

        const { checkout_reference, transaction_id, amount, currency, status } = checkoutDetails;
        const processedStatus = String(status).trim();
        console.log('Checkout details:', { checkout_reference, transaction_id, amount, currency, status: processedStatus });

        if (processedStatus === 'PAID') {
            console.log('Payment is PAID, processing...');
            const existingPurchase = await db.collection('purchases').doc(transaction_id).get();

            if (existingPurchase.exists) {
                console.log('Purchase already exists, skipping...');
                return res.json({ received: true });
            }

            const parts = checkout_reference.split('|');
            if (checkout_reference.startsWith('specialist-')) {
                // Marcação de especialista
                const pendingDoc = await db.collection('pending_specialist_bookings').doc(checkout_reference).get();
                if (!pendingDoc.exists) {
                    console.error('Detalhes da marcação não encontrados para o checkout_reference:', checkout_reference);
                    return res.status(500).json({ error: 'Detalhes da marcação não encontrados.' });
                }
                const { name, email, date, time } = pendingDoc.data();
                const TEAMS_LINK = 'https://teams.microsoft.com/l/meetup-join/placeholder';
                const dataFormatada = new Date(date).toLocaleDateString('pt-PT');
                await db.collection('specialist_bookings').doc(transaction_id).set({
                    name,
                    email,
                    date,
                    time,
                    transactionId: transaction_id,
                    amount,
                    currency,
                    bookedAt: new Date(),
                    status: processedStatus
                });
                // Enviar email de confirmação para o utilizador
                try {
                    const emailHtml = `
                        <h2>Olá ${name}!</h2>
                        <p>A sua marcação foi confirmada com sucesso.</p>
                        <ul>
                            <li><strong>Data:</strong> ${dataFormatada}</li>
                            <li><strong>Hora:</strong> ${time}</li>
                            <li><strong>Valor:</strong> ${Number(amount).toFixed(2)}€</li>
                            <li><strong>Link da Aula (Teams):</strong> <a href="${TEAMS_LINK}">${TEAMS_LINK}</a></li>
                        </ul>
                        <p>Obrigado por escolher a nossa plataforma!</p>
                    `;
                    await db.collection('mail').add({
                        to: email,
                        message: {
                            subject: 'Confirmação da sua Aula com Especialista',
                            html: emailHtml,
                        },
                    });
                    console.log('Confirmation email queued for specialist:', email);
                    // Enviar email para a empresa
                    const empresaHtml = `
                        <p>Nova marcação recebida:</p>
                        <ul>
                            <li><b>Nome:</b> ${name}</li>
                            <li><b>Email:</b> ${email}</li>
                            <li><b>Data:</b> ${dataFormatada}</li>
                            <li><b>Hora:</b> ${time}</li>
                        </ul>
                    `;
                    await db.collection('mail').add({
                        to: 'geral@contacontando.pt',
                        message: {
                            subject: 'Nova marcação de especialista',
                            html: empresaHtml,
                        },
                    });
                    console.log('Confirmation email queued for empresa (especialista): geral@contacontando.pt');
                } catch (emailError) {
                    console.error('Error sending specialist confirmation email:', emailError);
                }
                await db.collection('pending_specialist_bookings').doc(checkout_reference).delete();
                console.log('Specialist booking saved and emails sent!');
            } else {
                const buyerEmail = parts[2];
                const courseId = parts[1];
                console.log('Parsed checkout reference:', { parts, buyerEmail, courseId });

                await db.collection('purchases').doc(transaction_id).set({
                    email: buyerEmail || '',
                    courseId: courseId,
                    transactionId: transaction_id,
                    amount: amount,
                    currency: currency,
                    purchasedAt: new Date(),
                    status: processedStatus
                });
                console.log('Purchase saved to database');
                try {
                    const courseRef = db.collection('courses').doc(courseId);
                    const courseDoc = await courseRef.get();

                    let courseTitle = courseId;
                    if (courseDoc.exists) {
                        const courseData = courseDoc.data();
                        courseTitle = courseData.title || courseId;
                        const emailHtml = `
                            <h1>Olá!</h1>
                            <p>A sua inscrição na formação "${courseTitle}" foi confirmada com sucesso.</p>
                            <p>Abaixo estão os detalhes para aceder à formação:</p>
                            <ul>
                                ${courseData.dateDisplay ? `<li><strong>Data:</strong> ${courseData.dateDisplay}</li>` : ''}
                                ${courseData.link ? `<li><strong>Link de Acesso:</strong> <a href="${courseData.link}">${courseData.link}</a></li>` : ''}
                                ${courseData.meetingId ? `<li><strong>ID da Reunião:</strong> ${courseData.meetingId}</li>` : ''}
                                ${courseData.meetingPass ? `<li><strong>Password:</strong> ${courseData.meetingPass}</li>` : ''}
                            </ul>
                            <p>Guarde este email para referência futura.</p>
                            <p>Obrigado!</p>
                        `;
                        await db.collection('mail').add({
                            to: buyerEmail,
                            message: {
                                subject: `Detalhes de Acesso: ${courseTitle}`,
                                html: emailHtml,
                            },
                        });
                        console.log('Confirmation email queued for:', buyerEmail);
                        // Enviar email para a empresa
                        const empresaHtml = `
                            <p>Nova inscrição recebida:</p>
                            <ul>
                                <li><b>Nome:</b> ${buyerEmail}</li>
                                <li><b>Email:</b> ${buyerEmail}</li>
                                <li><b>Formação:</b> ${courseTitle}</li>
                            </ul>
                        `;
                        await db.collection('mail').add({
                            to: 'geral@contacontando.pt',
                            message: {
                                subject: 'Nova inscrição em formação',
                                html: empresaHtml,
                            },
                        });
                        console.log('Confirmation email queued for empresa (curso): geral@contacontando.pt');
                    } else {
                        console.error(`Course with ID ${courseId} not found.`);
                    }
                } catch (emailError) {
                    console.error('Error sending confirmation email:', emailError);
                }
            }
        } else {
            console.log('Payment status is not PAID:', processedStatus);
        }
    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    console.log('Webhook received event type:', event.event_type);
  }

  res.json({ received: true });
} 