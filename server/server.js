const express = require("express");
const cors = require("cors");
require("dotenv").config();

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const admin = require('firebase-admin');

// Initialize Firebase with environment variables
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

const db = admin.firestore();

app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details.email;
    const courseTitle = session.metadata ? session.metadata.courseTitle : 'Unknown Course';

    // Save to Firestore
    await db.collection('purchases').add({
      email: email,
      courseTitle: courseTitle,
      purchasedAt: new Date(),
      sessionId: session.id
    });

    console.log(`Purchase saved for ${email} - ${courseTitle}`);
  }

  response.json({ received: true });
});

// Now use express.json() for all other routes
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running!')
})

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
})

app.post('/create-checkout-session', async(req, res) => {
    const {courseTitle, coursePrice, successUrl, cancelUrl} = req.body;

    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'paypal'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: courseTitle,
                    },
                    unit_amount: coursePrice * 100,
                },
                quantity: 1,
            }
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'payment',
        metadata: {
            courseTitle: courseTitle,
        },
    });
    res.json({id: session.id});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
})