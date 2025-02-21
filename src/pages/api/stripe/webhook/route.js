import Stripe from 'stripe';
import getRawBody from 'raw-body';

export const config = {
  api: {
    bodyParser: false, 
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    return new Response('Webhook Error: No stripe-signature header', { status: 400 });
  }

  let event;
  try {
    const buf = await getRawBody(req);
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("🔹 Stripe Webhook received:", event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log("✅ Payment completed for:", session.customer_email);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
