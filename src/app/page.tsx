"use client";
// import { MacbookScrollDemo } from "./ui/Home/Macbook";
import { BackgroundBeamsDemo } from "./ui/Home/Hero";
import { CardHoverEffectDemo } from "./ui/Home/PiontCard";
import { TextGenerateEffectDemo } from "./ui/Home/ConnectText";
import EmblaCarousel from "./ui/Home/EmblaCarousal";
import Team from "./ui/Home/Team";
import Suggestion from "./ui/Home/Suggestion";
import { EmblaOptionsType } from 'embla-carousel'
import './ui/embla.css';
import './ui/style.css';


export default function Home() {

  const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDE_COUNT = 8
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <div className="bg-primary">
          <BackgroundBeamsDemo />
      <div className="custom-container flex flex-col gap-4">

        <div className=" flex  mx-auto flex-col lg:flex-row gap-10 my-10">
          <div className=" ">
            <img src="/Images/macbook.png" alt="macbook" className="w-full" />
          </div>
          <div className="">
            <h1 className="text-6xl  mb-4 bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 font-extrabold">What is Connect ?</h1>
            <div className="text-white max-w-xl p-4">
              <TextGenerateEffectDemo />
            </div>
          </div>
        </div>


        <div className="my-10">
          <CardHoverEffectDemo />
        </div>

        <div className=" flex  mx-auto flex-col lg:flex-row my-10">
          <div className="">
            <h1 className="text-6xl font-extrabold  mb-4 bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70">Benefits</h1>
            <div className="text-white max-w-xl p-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
          <div className=" ">
            <img src="/Images/benfit.png" alt="macbook" className="w-full" />
          </div>
        </div>

        <div className="my-10">
          <h1 className="text-6xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 my-10 font-extrabold text-center">Event</h1>
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>

        <div className="my-10">
          <Team />
        </div>


        <div className="my-10 mb-28">
          <Suggestion />
        </div>


      </div>
    </div>

  );
}
