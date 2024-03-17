"use client";
import React from "react";
import { BackgroundBeams } from "../../../components/ui/background-beams";
import { BackgroundGradientDemo } from "./Image";
import Link from 'next/link';
 

export function BackgroundBeamsDemo() {
  return (
    <div className=" w-full rounded-md bg-custom-bg relative flex flex-col items-center justify-center antialiased py-10 select-none">
      <div className="max-w-2xl mx-auto p-4 flex flex-col items-center gap-4 text-center mb-8">
        <h1 className="relative z-10 text-3xl md:text-5xl  bg-clip-text text-transparent  text-center font-sans font-bold gradient">
          Lorem ipsum dolor sit amet
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
        </p>
        <button className="bg-white/10 backdrop-blur text-white rounded-full px-6 py-2 mt-4 relative z-30 cursor-pointer min-w-[80px]">
          <Link href="/join" className="text-white">
          Join Now
          </Link>
        </button>
      </div>
      {/* <BackgroundGradientDemo /> */}
      <div className="relative z-20 flex items-center justify-center mt-10">
      <img src="/Images/Gradient.png" alt="macbook" className="absolute  h-[280px] -top-36 w-[90%] -z-10" />
      <img src="/Images/groupImage.png" alt="macbook" className="z-50 w-[90%]" />
      </div>
     
      <BackgroundBeams />
    </div>
  );
}
