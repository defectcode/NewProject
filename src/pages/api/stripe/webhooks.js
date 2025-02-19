import { buffer } from "micro";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    const rawBody = await buffer(req);
    event = stripe.webhooks.constructEvent(
      rawBody.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    console.log("🔔 Payment Succeeded:", paymentIntent.id);

    const charge = paymentIntent.latest_charge 
      ? await stripe.charges.retrieve(paymentIntent.latest_charge) 
      : null;

    const paymentLinkId = charge?.metadata?.payment_link_id || null;

    if (paymentLinkId) {
      console.log(`📝 Updating PaymentIntent ${paymentIntent.id} with payment_link_id: ${paymentLinkId}`);

      await stripe.paymentIntents.update(paymentIntent.id, {
        metadata: { payment_link_id: paymentLinkId },
      });
    }
  }

  res.json({ received: true });
}
