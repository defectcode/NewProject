import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, fullName, contact, brand, goal, message } = await req.json();

  if (!email || !fullName || !contact || !brand) {
    return new Response('Required fields are missing', { status: 400 });
  }

  try {
    // const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSep6g27u3tQvHY8j4q3FU8jR7DK93qrqIGcIl8Q_0SSE3LzGA/formResponse';
    const formUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSep6g27u3tQvHY8j4q3FU8jR7DK93qrqIGcIl8Q_0SSE3LzGA/formResponse';
    const formData = new URLSearchParams();
    formData.append('entry.200719805', fullName);
    formData.append('entry.783419390', contact);
    formData.append('entry.1586475598', brand);
    formData.append('entry.212391582', goal);
    formData.append('entry.2105910764', message);


    const response = await fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to submit to Google Form');
    }

    return new Response(JSON.stringify({ message: 'Form submitted successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Failed to submit form', { status: 500 });
  }
}