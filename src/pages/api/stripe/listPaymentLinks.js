import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const paymentLinks = await stripe.paymentLinks.list({ limit: 10 });
        res.status(200).json(paymentLinks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
