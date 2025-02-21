import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.setHeader('Allow', ['POST']).status(405).end('Method Not Allowed');
  }

  try {
    const { paymentLinkId, userId } = req.body;

    console.log("🔹 Received data:", { paymentLinkId, userId });

    const origin = req.headers.origin || 'https://valeryfain.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1QtXZhHWwCgaMkWCgBuWKX1y', // 🔹 Înlocuiește cu `price_id` asociat lui `prod_Rn7pDYt34HADUv`
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: { payment_link_id: paymentLinkId, user_id: userId },
      success_url: `${origin}/success`,
      cancel_url: `${origin}/error`,
    });

    console.log("✅ Session created:", session);

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("❌ Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
}
