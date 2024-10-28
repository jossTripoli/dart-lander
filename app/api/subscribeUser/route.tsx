import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Configure Mailchimp with environment variables
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // e.g., 'us21'
});

// Handle the POST request to add a new subscriber
export async function POST(req: NextRequest) {
  const { email_address, status, merge_fields } = await req.json();

  // Validate request data
  if (!email_address || !status) {
    return NextResponse.json({ error: 'Email address and status are required.' }, { status: 400 });
  }

  try {
    // Add subscriber to Mailchimp audience
    await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID as string,
      {
        email_address,
        status,
        merge_fields,
      }
    );

    // Respond with success message
    return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 200 });
  } catch (err) {
    console.error('Mailchimp Error:', err);
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 400 });
  }
}
