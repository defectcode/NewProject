import Stripe from 'stripe';
import getRawBody from 'raw-body';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, // Stripe necesită bodyParser dezactivat pentru webhook-uri
  },
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
    console.error("⚠️ Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // ✅ Adaugă acest log pentru a verifica `metadata`
    console.log("🔹 Session metadata:", session.metadata);

    try {
      await stripe.paymentIntents.update(session.payment_intent, {
        metadata: {
          payment_link_id: session.metadata?.payment_link_id || "plink_1QtnQ7Eop8dXaHk5KT3KWoFA",
          // user_id: session.metadata?.user_id || "misdsdsdsing",
        },
      });

      console.log(`✅ Metadata updated for PaymentIntent: ${session.payment_intent}`);
    } catch (err) {
      console.error("⚠️ Error updating metadata:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  res.json({ received: true });
}
