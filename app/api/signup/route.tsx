import { NextRequest, NextResponse } from 'next/server';
import mailchimp, { ErrorResponse } from '@mailchimp/mailchimp_marketing';

interface ErrorWithStatus extends Error {
  status?: number;
}

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY || '',
  server: process.env.NEXT_PUBLIC_MAILCHIMP_DC || '',
});


// Define the POST function
export async function POST(req: NextRequest) {
  try {
    // Extract and validate request body
    const { email_address, status, merge_fields } = await req.json();

    if (!email_address) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    // Call Mailchimp API to add a member to the list
    const result = await mailchimp.lists.addListMember(
      process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID || '',
      {
        email_address,
        status,
        merge_fields,
      }
    );

    // Check if the result is an error response
    if ((result as ErrorResponse).status && (result as ErrorResponse).status >= 400) {
      const errorStatus = Number((result as ErrorResponse).status);
      console.log("*****ERROR STATUS: ", errorStatus);
      const errorDetail = (result as ErrorResponse).detail || 'An error occurred with Mailchimp.';

      // Handle "already a list member" specific error
      if (errorStatus === 400 && errorDetail.includes('already a list member')) {
        return NextResponse.json(
          { error: 'This email is already subscribed.' },
          { status: 400 }
        );
      }

      return NextResponse.json(        
        { error: errorDetail },
        { status: Number((result as ErrorResponse).status) }
      );
    }

    // Successful subscription response
    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error) {
    const typedError = error as ErrorWithStatus;
    return NextResponse.json(
      { error: typedError.message || 'Failed to process request.' },
      { status: typedError.status }
    );
  }
}
