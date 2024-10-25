'use client';

import Image from "next/image";
import SubscribeForm from "./components/subscribe-form";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">

      <div className="flex flex-col items-center">
        <div className="bg-white p-6 text-center rounded-lg shadow-l flex flex-col items-center">
          <Image 
            src="https://dart-academy-public-resources.s3.us-east-1.amazonaws.com/logo/logo.svg" 
            alt="DART Academy Logo" 
            width={350} 
            height={350} 
            className="mb-8"
          />
          <div className="w-full">
            <h1 className="text-xl font-bold text-sapphire mb-4 text-left">Coming Soon</h1>
            <p className="text-lg text-richBlack mb-6 text-left">Learn how to protect yourself from scams.</p>
          </div>

          
          <SubscribeForm />

          {/* <form className="relative z-10 mx-10 lg:max-w-xl lg:mx-auto border-blue-500">
            <input
              type="text"
              placeholder="name@email.com"
              className="w-full text-2xl font-light text-gray-900 placeholder-gray-500 py-5 pl-5 pr-36 lg:pr-44 rounded-xl"
            />
            <button className="absolute top-1 right-1 bottom-1 px-4 lg:px-10 text-xl font-semibold bg-pear text-black rounded-xl transition ease-in-out duration-500 hover:bg-red-500">
              Notify me
            </button>
          </form> */}


          {/* <div className="flex space-x-4">
            <button className="px-8 py-2 text-xl rounded-full bg-pear text-richBlack hover:bg-skyblue transition">
              Notify Me
            </button>
            <a href="https://dartcollective.net/dart-academy/" target="_blank" rel="noreferrer">
              <button className="px-8 py-2 text-xl rounded-full bg-pear text-richBlack hover:bg-skyblue transition">
                Learn more
              </button>
            </a>
          </div> */}
        </div>


        <div className="flex mt-8 space-x-4">
          <a 
            href="https://www.facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-sapphire shadow-lg hover:bg-sapphire hover:text-white transition-colors"
          >
            <FaFacebookF size={25} />
          </a>
          <a 
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-sapphire shadow-lg hover:bg-sapphire hover:text-white transition-colors"
          >
            <FaInstagram size={25} />
          </a>
          <a 
            href="https://www.linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-sapphire shadow-lg hover:bg-sapphire hover:text-white transition-colors"
          >
            <FaLinkedinIn size={25} />
          </a>
        </div>


      </div>
    </div>
  );
}
