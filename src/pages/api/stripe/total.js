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
    // Получаем список checkout-сессий
    const sessions = await stripe.checkout.sessions.list({ limit: 1000 });
    if (!sessions || !sessions.data) {
      return res.status(500).json({ error: "Stripe API response is invalid." });
    }

    // Фильтруем сессии по метаданным и статусу оплаты
    const filteredSessions = sessions.data.filter(session =>
      session.metadata &&
      session.metadata.payment_link_id &&
      session.metadata.payment_link_id.trim() === paymentLinkId.trim() &&
      session.payment_status === "paid"
    );

    // Рассчитываем общую сумму (если в checkout-сессии используется поле amount_total)
    const totalRaised = filteredSessions.reduce((acc, session) => acc + (session.amount_total || 0), 0) / 100;
    const totalTransactions = filteredSessions.length;

    // Из метаданных (plink) можно взять значение из первой успешной сессии
    const plink = filteredSessions.length > 0 ? filteredSessions[0].metadata.payment_link_id : null;

    res.status(200).json({ totalRaised, totalTransactions, plink });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}