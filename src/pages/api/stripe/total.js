import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payments = await stripe.paymentIntents.list({ limit: 100 });

    const totalRaised = payments.data
      .filter(payment => payment.status === "succeeded")
      .reduce((acc, payment) => acc + payment.amount_received, 0) / 100;

    const totalTransactions = payments.data.filter(payment => payment.status === "succeeded").length;

    res.status(200).json({ totalRaised, totalTransactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
