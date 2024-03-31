"use client";
import React from "react";
import { BackgroundBeams } from "../../../components/ui/background-beams";
import { TypewriterEffectSmooth } from "../../../components/ui/typewriter-effect";

import Link from 'next/link';
 

export function BackgroundBeamsDemo() {
  const words = [
    {
      text: "Connect",
    },
    {
      text: "lives",
    },
    {
      text: "with",
    },
    {
      text: "Passion.",
      className: "text-amber-500 dark:text-amber-500",
    },
  ];
  return (
    <div className=" w-full rounded-md bg-custom-bg relative flex flex-col items-center justify-center antialiased py-10 select-none">
      <div className="max-w-[1200px] mx-auto">

      <div className="max-w-2xl mx-auto p-4 flex flex-col items-center gap-4 text-center mb-8">
        {/* <h1 className="relative z-10 text-4xl md:text-5xl   bg-clip-text text-transparent  text-center font-sans font-bold bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70">
          Lorem ipsum dolor sit amet
        </h1> */}
        <TypewriterEffectSmooth words={words} />
        <p className="text-neutral-500 max-w-lg mx-auto my-2 mt-0 text-center relative z-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
        </p>
          <Link href="/join" className="text-white">
        <button className="bg-white/10 backdrop-blur text-white rounded-full px-6 py-2 mt-4 relative z-30 cursor-pointer min-w-[80px] border border-gray-800 transition-all ease-in-out hover:bg-white/5">
          Join Now
        </button>
          </Link>
      </div>
      <div className="relative z-20 flex items-center justify-center mt-10">
      <img src="/Images/Gradient.png" alt="macbook" className="absolute  h-[280px] -top-24 md:-top-28 w-[90%] -z-10" />
      <img src="/Images/groupImage.png" alt="macbook" className="z-50 w-[90%] custom-container" />
      </div>
      </div>
     
      <BackgroundBeams />
    </div>
  );
}
