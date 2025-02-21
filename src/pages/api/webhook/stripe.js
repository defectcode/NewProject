import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`⚠️ Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;

        console.log("✅ PaymentIntent succeeded:", paymentIntent.id);

        await stripe.paymentIntents.update(paymentIntent.id, {
            metadata: { payment_link_id: "plink_1QtXZhHWwCgaMkWCzM9cDLUa" },
        });

        console.log("🔄 Metadata updated for:", paymentIntent.id);
    }

    res.json({ received: true });
}
