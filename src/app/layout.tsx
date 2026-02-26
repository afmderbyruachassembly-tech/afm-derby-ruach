import { repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import { Inter } from "next/font/google";
// import localFont from "next/font/local";
import Navbar from "@/components/navbar";
import { getGlobals } from "@/lib/get-globals";
import React from "react";
import "./global.css";

// const giga_sans = localFont({
//   src: [
//     {
//       path: "./fonts/GigaSansMedium.otf",
//       weight: "600",
//       style: "medium",
//     },
//     {
//       path: "./fonts/GigaSansBold.otf",
//       weight: "700",
//       style: "bold",
//     },
//     {
//       path: "./fonts/GigaSansExtraLight.otf",
//       weight: "200",
//       style: "extra-light",
//     },
//     {
//       path: "./fonts/GigaSansLight.otf",
//       weight: "300",
//       style: "light",
//     },
//     {
//       path: "./fonts/GigaSansRegular.otf",
//       weight: "400",
//       style: "regular",
//     },
//   ],
//   display: "swap",
// });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getGlobals();
  console.log(data.navigation.data);

  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="AFM Derby Ruach is a church that believes in the power of the Holy Spirit and the Bible." />
        <meta name="keywords" content="AFM Derby Ruach Assembly, AFM, Church, Bible, Jesus Christ, Gospel" />
        <meta name="author" content="AFM Derby Ruach Assembly" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="notranslate" />
      </head>
      <body>
        <Navbar data={data.navigation.data} />
        <div className="relative min-h-[100vh]">{children}</div>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
