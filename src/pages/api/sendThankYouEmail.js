import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, amount } = req.body;

  if (!email || email === "no-email@example.com") {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, 
    subject: 'Thank You for Your Donation!',
    html: `<h2>Thank you for your donation!</h2>
           <p>We appreciate your generous contribution of <strong>$${amount}</strong>.</p>
           <p>Your support makes a big difference!</p>
           <br>
           <p>Best regards,</p>
           <p>ValeryFain</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ error: 'Error sending email' });
  }
}
