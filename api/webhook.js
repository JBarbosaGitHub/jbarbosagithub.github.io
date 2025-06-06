import { buffer } from 'micro';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import admin from 'firebase-admin';

// Initialize Firebase only if not already initialized
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

export default async function handler(req, res) {
  console.log('Webhook received:', req.method);

  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    console.log('Webhook event constructed successfully:', event.type);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Processing checkout.session.completed event:', session.id);

    const email = session.customer_details.email;
    const courseId = session.metadata ? session.metadata.courseId : null;
    const courseTitle = session.metadata ? session.metadata.courseTitle : 'Unknown Course';

    console.log('Purchase details:', { email, courseId, courseTitle });

    // Save to Firestore
    try {
      await db.collection('purchases').add({
        email: email,
        courseId: courseId,
        courseTitle: courseTitle,
        purchasedAt: new Date(),
        sessionId: session.id
      });
      console.log(`Purchase saved successfully for ${email} - ${courseTitle}`);
    } catch (error) {
      console.error('Error saving purchase to Firestore:', error);
    }
  } else {
    console.log('Unhandled event type:', event.type);
  }

  res.json({ received: true });
} 