function SubscribeForm() {
  const newsletterheading = "Notify me when it's ready";
  const hideSubscribeForm = false;

  return (
    <>
    { hideSubscribeForm === false ? (
          <section className="text-center lg:m-7 mt-10 w-5/6 p-3">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="bloc dark:text-slate-100  font-light text-[1.25rem] text-gray-300 leading-6"
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
                    className="block text-lg w-full placeholder:text-gray-500 pl-[10px] focus:outline-none border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6 mr-0 rounded-none p-2"
                  />
                  <button className="ml-0 bg-pear sm:w-auto border-darkpear dark:border-slate-100	rounded-none mt-2 md:mt-0	p-2 border-2 dark:text-white hover:bg-skyblue">
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </section>
        ) : (
          ""
        )}
    </>
  )
}

export default SubscribeForm