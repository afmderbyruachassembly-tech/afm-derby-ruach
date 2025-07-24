import { repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import { Inter } from "next/font/google";
// import localFont from "next/font/local";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="relative min-h-[100vh]">{children}</div>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
