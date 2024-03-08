"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { BackgroundGradientDemo } from "./Image";

export function BackgroundBeamsDemo() {
  return (
    <div className="h-[36rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 flex flex-col items-center gap-4 text-center mb-8">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Lorem ipsum dolor sit amet
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
        </p>
        <button className="bg-gradient-to-r from-neutral-200 to-neutral-600 text-neutral-950 rounded-full px-4 py-2 mt-4 relative z-10 ">
          Join Now
        </button>
      </div>
      <BackgroundGradientDemo />

      <BackgroundBeams />
    </div>
  );
}
