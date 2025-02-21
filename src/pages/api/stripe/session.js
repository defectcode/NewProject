import Stripe from 'stripe';
import { exec } from 'child_process';

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
        metadata: { payment_link_id: 'plink_1QtXZhHWwCgaMkWCzM9cDLUa' },
        success_url: `${origin}/success`,
        cancel_url: `${origin}/error`,
      });

      console.log("✅ Session created:", session);

      const curlCommand = `curl -X POST https://api.stripe.com/v1/checkout/sessions \
        -u ${process.env.STRIPE_SECRET_KEY}: \
        -d "payment_method_types[]=card" \
        -d "line_items[][price_data][currency]=usd" \
        -d "line_items[][price_data][product_data][name]=Support Donation" \
        -d "line_items[][price_data][unit_amount]=1000" \
        -d "line_items[][quantity]=1" \
        -d "metadata[payment_link_id]=plink_1QtXZhHWwCgaMkWCzM9cDLUa" \
        -d "mode=payment" \
        -d "success_url=https://valeryfain.com/success" \
        -d "cancel_url=https://valeryfain.com/cancel"`;

      exec(curlCommand, (error, stdout, stderr) => {
        if (error) {
          console.error("Error executing curl command:", error);
          return;
        }
        console.log("Curl command output:", stdout);
        if (stderr) console.error("Curl command stderr:", stderr);
      });

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
