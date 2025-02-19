import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { payment_link_id } = req.query;

        if (!payment_link_id) {
            return res.status(400).json({ error: 'Missing payment_link_id' });
        }

        // Obține toate Payment Intents
        const paymentIntents = await stripe.paymentIntents.list({ limit: 100 });

        // Filtrăm doar tranzacțiile care au acest Payment Link ID în metadata
        const filteredPayments = paymentIntents.data.filter(payment =>
            payment.metadata?.payment_link_id === payment_link_id && payment.status === "succeeded"
        );

        // Calculăm totalul sumelor primite
        const totalRaised = filteredPayments.reduce((acc, payment) => acc + payment.amount_received, 0) / 100;
        const totalTransactions = filteredPayments.length;

        res.status(200).json({ totalRaised, totalTransactions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
