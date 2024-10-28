'use server';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const MAILCHIMP_API_SERVER = process.env.MAILCHIMP_API_SERVER;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const data = {
      email_address: email,
      status: 'subscribed',
    };

    // Make the request to Mailchimp server-side
    const response = await fetch(
      `https://${MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      return NextResponse.json({ message: 'Successfully subscribed!' });
    } else {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.detail || 'An error occurred' }, { status: response.status });
    }
  } catch (error) {
    console.log("THE ERROR" + error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
