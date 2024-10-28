import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Set up Mailchimp configuration using environment variables
mailchimp.setConfig({
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY as string,
  server: process.env.NEXT_PUBLIC_MAILCHIMP_DC as string,
});

// Handle the POST request to add a subscriber to Mailchimp
export async function POST(req: NextRequest) {
  const { email_address, status, merge_fields } = await req.json();

  // Validate incoming request
  if (!email_address || !status) {
    return NextResponse.json({ error: 'Email address and status are required' }, { status: 400 });
  }

  try {
    // Make the request to add the subscriber
    await mailchimp.lists.addListMember(
      process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID as string,
      {
        email_address,
        status,
        merge_fields,
      }
    );

    return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 200 });
  } catch (err) {
    console.error('Mailchimp Error:', err);
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 400 });
  }
}
