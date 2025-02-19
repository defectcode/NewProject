import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { paymentLinkId } = req.query;

  if (!paymentLinkId) {
    return res.status(400).json({ error: 'Payment Link ID is required' });
  }

  try {
    const payments = await stripe.paymentIntents.list({ limit: 100 });

    if (!payments || !payments.data) {
      return res.status(500).json({ error: "Stripe API response is invalid." });
    }

    const filteredPayments = payments.data.filter(payment =>
      payment.metadata &&
      payment.metadata.payment_link_id &&
      payment.metadata.payment_link_id.trim() === paymentLinkId.trim() && 
      payment.status === "succeeded"
    );

    const totalRaised = filteredPayments.reduce((acc, payment) => acc + payment.amount_received, 0) / 100;
    const totalTransactions = filteredPayments.length;

    res.status(200).json({ totalRaised, totalTransactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
