import Stripe from 'stripe';
import getRawBody from 'raw-body';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const buf = await getRawBody(req);
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("⚠️ Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log("🔹 Payment completed:", session);

    try {
      if (session.payment_intent) {
        await stripe.paymentIntents.update(session.payment_intent, {
          metadata: {
            payment_link_id: session.metadata.payment_link_id,
            user_id: session.metadata.user_id,
          },
        });

        console.log(`✅ Metadata updated for PaymentIntent: ${session.payment_intent}`);
      }
    } catch (err) {
      console.error("❌ Error updating metadata:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  res.json({ received: true });
}
