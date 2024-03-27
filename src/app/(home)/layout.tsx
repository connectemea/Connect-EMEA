// "use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../ui/layout/Footer";
import "../ui/styles/globals.css";
import Header from "../ui/layout/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connect",
  description: "Connect portfolio webiste",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed w-full z-50 ">
          <Header />
        </div>
        <div className="pt-16 z-10" id="top">
          {children}
        </div>
        <div className="z-20 sticky">
          <Footer />
        </div>
      </body>
    </html>
  );
}
