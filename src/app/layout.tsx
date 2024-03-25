// "use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./ui/Footer";
import "./ui/globals.css";
import Header from "./ui/header";

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
        <div className="pt-16 " id="top">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
