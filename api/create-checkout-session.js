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
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const body = await json(req);
    const { courseId, amount, currency, description, successUrl, cancelUrl, buyerEmail, specialistName, specialistDate, specialistTime } = body;

    if (!courseId || !amount || !currency || !description || !buyerEmail) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    let checkoutReference;
    let amountToUse = amount;
    if (courseId.startsWith('specialist|')) {
      checkoutReference = `specialist-${Date.now()}`;
      amountToUse = 29.90;
      await db.collection('pending_specialist_bookings').doc(checkoutReference).set({
        checkoutReference,
        name: specialistName,
        email: buyerEmail,
        date: specialistDate,
        time: specialistTime,
        amount: amountToUse,
        currency,
        createdAt: new Date(),
        status: 'PENDING'
      });
    } else {
      checkoutReference = `course|${courseId}|${buyerEmail}|${Date.now()}`;
      // Validação de curso
      const courseDoc = await db.collection('courses').doc(courseId).get();
      if (!courseDoc.exists) {
        return res.status(404).json({ error: 'Course not found' });
      }
    }

    const accessToken = await getSumUpAccessToken();
    const amountStr = Number(amountToUse).toFixed(2);
    const response = await fetch('https://api.sumup.com/v0.1/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        checkout_reference: checkoutReference,
        amount: amountStr,
        currency: currency,
        merchant_code: process.env.SUMUP_MERCHANT_CODE,
        description: description,
        return_url: successUrl,
        hosted_checkout: { enabled: true },
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create SumUp checkout');
    }

    res.status(200).json({ id: data.id, hosted_checkout_url: data.hosted_checkout_url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 