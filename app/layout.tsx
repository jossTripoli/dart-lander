import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "DART Academy",
  description: "Learn to protect yourself from scams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/hmn1xag.css" />
        <title>DART Academy - Coming Soon</title>
        <meta name="Dart" content="DART Academy - Coming soon. Learn to protect yourself from scams." />
        <link rel="icon" href="https://dart-academy-public-resources.s3.us-east-1.amazonaws.com/logo/favicon.png" />
      </head>
      <body className="bg-oxfordblue">
        {children}
      </body>
    </html>  );
}
