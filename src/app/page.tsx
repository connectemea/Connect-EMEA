"use client";
import Image from "next/image";
// import { MacbookScrollDemo } from "./ui/Home/Macbook";
import { BackgroundBeamsDemo } from "./ui/Home/Hero";
import { CardHoverEffectDemo } from "./ui/Home/PiontCard";
import { TextGenerateEffectDemo } from "./ui/Home/ConnectText";
import EmblaCarousel from "./ui/Home/EmblaCarousal";
import { EmblaOptionsType } from 'embla-carousel'
import './ui/embla.css';
import './ui/style.css';


export default function Home() {

  const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDE_COUNT = 8
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <div className="  bg-primary">
      <div className="custom-container flex flex-col gap-10">
        <div>
          <BackgroundBeamsDemo />
        </div>
        <div className=" flex  mx-auto flex-col lg:flex-row gap-10">
          <div className=" ">
            <img src="/Images/macbook.png" alt="macbook" className="w-full" />
          </div>
          <div className="">
            <h1 className="text-6xl  mb-4 gradient font-extrabold">What is Connect ?</h1>
            <div className="text-white max-w-xl p-4">
              <TextGenerateEffectDemo />
            </div>
          </div>
        </div>


        <div className="">
          <CardHoverEffectDemo />
        </div>

        <div className=" flex  mx-auto flex-col lg:flex-row">
          <div className="">
            <h1 className="text-6xl font-extrabold  mb-4 gradient">Benefits</h1>
            <div className="text-white max-w-xl p-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
          <div className=" ">
            <img src="/Images/benfit.png" alt="macbook" className="w-full" />
          </div>
        </div>

        <div>
          <h1 className="text-6xl gradient my-10 font-extrabold text-center">Event</h1>
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />

        </div>

        <div className="min-h-[400px] bg-gray-500 my-2 text-center">
          Our Team
        </div>


        <div className="min-h-[400px] bg-gray-400 my-2 text-center mb-20">
          Suggestions
        </div>


      </div>
    </div>

  );
}
