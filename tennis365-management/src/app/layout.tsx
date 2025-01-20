import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
title: {
    template: "%s | 365",
    default: "Tennis 365",
},
  description: "Tennis club management tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navigation/> */}
        {children}
        <SpeedInsights/>
        </body>
    </html>
  );
}
