import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { wishlistId } = req.query; // Preluăm ID-ul wishlist-ului din query

  if (!wishlistId) {
    return res.status(400).json({ error: 'Missing wishlistId parameter' });
  }

  try {
    // Obținem toate plățile recente
    const payments = await stripe.paymentIntents.list({ limit: 100 });

    // Filtrăm doar plățile care aparțin wishlist-ului respectiv
    const wishlistPayments = payments.data.filter(
      (payment) => payment.metadata?.wishlist_id === wishlistId && payment.status === "succeeded"
    );

    // Calculăm suma totală strânsă
    const totalAmount = wishlistPayments.reduce(
      (sum, payment) => sum + payment.amount_received,
      0
    );

    // Numărăm câți donatori au contribuit
    const totalGifters = wishlistPayments.length;

    res.status(200).json({ totalRaised: totalAmount / 100, totalTransactions: totalGifters });
  } catch (error) {
    console.error("Stripe API Error:", error);
    res.status(500).json({ error: error.message });
  }
}
