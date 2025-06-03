const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { courseId, courseTitle, coursePrice, successUrl, cancelUrl } = req.body;

  const courseDoc = await db.collection('courses').doc(courseId).get();
  if (!courseDoc.exists) {
    return res.status(404).json({ error: 'Course not found' });
  }
  const course = courseDoc.data();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'paypal'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: courseTitle,
        },
        unit_amount: coursePrice * 100, // Stripe expects cents
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      courseId: courseId,
      courseTitle: courseTitle,
      coursePrice: coursePrice
    }
  });

  res.status(200).json({ id: session.id });
}; 