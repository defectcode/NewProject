import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount, paymentLinkId, userId } = req.body;

      console.log("🔹 Received data:", { amount, paymentLinkId, userId });

      const origin = req.headers.origin || 'https://valeryfain.com';

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: 'Support Donation' },
              unit_amount: amount * 100,
            },
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
      console.error("Stripe Error:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Unallowed method');
  }
}
