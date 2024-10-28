import { useState, FormEvent } from 'react';

function SubscribeForm() {
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const newsletterheading = "Notify me when it's ready";
  const hideSubscribeForm = false;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the backend API route
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: { FNAME: 'User' }, // Add other fields as needed
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Successfully subscribed!');
      } else {
        setMessage(`Error: ${data.error || 'An error occurred'}`);
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
      setEmail(''); // Clear the input field after submission
    }
  };

  return (
    <>
      {!hideSubscribeForm && (
        <section className="text-center lg:m-7 mt-10 w-5/6 p-3">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block dark:text-slate-100 font-light text-[1.25rem] text-gray-300 leading-6"
              >
                {newsletterheading}
              </label>
              <div className="mt-4 flex-col flex lg:flex md:flex-row text-lg">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block text-lg w-full placeholder:text-gray-500 pl-[10px] focus:outline-none border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6 mr-0 rounded-none p-2"
                />
                <button
                  type="submit"
                  className="ml-0 bg-pear sm:w-auto border-darkpear dark:border-slate-100 rounded-none mt-2 md:mt-0 p-2 border-2 dark:text-white hover:bg-skyblue"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {message && <p className="mt-2 text-sm text-gray-500">{message}</p>}
            </div>
          </form>
        </section>
      )}
    </>
  );
}

export default SubscribeForm;
