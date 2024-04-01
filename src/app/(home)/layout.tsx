"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../ui/layout/Footer";
import "../ui/styles/globals.css";
import Header from "../ui/layout/header";
import { FloatButton, Switch } from 'antd';


const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Connect",
//   description: "Connect portfolio webiste",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const theme = localStorage.getItem('theme');
  const body = document.querySelector('body');
  if (body) {
    if (theme === 'darkMode') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }
 

  return (
    <html lang="en" >
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
        <FloatButton.BackTop />
      </body>
    </html>
  );
}
