import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Support Donation',
              },
              unit_amount: amount * 100, // Suma în cenți
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error('Eroare la crearea sesiunii Stripe:', error);
      res.status(500).json({ error: 'Crearea sesiunii a eșuat' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Metodă nepermisă');
  }
}