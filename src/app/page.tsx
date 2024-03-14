import Image from "next/image";
// import { MacbookScrollDemo } from "./ui/Home/Macbook";
import {BackgroundBeamsDemo} from "./ui/Home/Hero";
import {CardHoverEffectDemo} from "./ui/Home/PiontCard";
import { TextGenerateEffectDemo } from "./ui/Home/ConnectText";
import NavLinks from "./ui/NavBar";
import EmblaCarousel from "./ui/Home/EmblaCarousal";
import { EmblaOptionsType } from 'embla-carousel'
import './ui/embla.css';
const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 8
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function Home() {
  return (
    <div className="flex flex-col  bg-custom-bg">
      <div>
       <NavLinks />
       <BackgroundBeamsDemo />
      </div>
      <div className=" flex  mx-auto">
        <div className=" ">
          <div className="">
            <div className=" h-full ">
              {/* <MacbookScrollDemo /> */}
              <img src="/Images/macbook.png" alt="macbook" className="w-full" />
            </div>
          </div>

        </div>
        <div className="w-full h-full flex items-center justify-start">
          <div className="p-4 flex items-center justify-center flex-col">
          <h1 className="text-4xl text-white mb-4">Connect with your friends</h1>
          <p className="text-white max-w-xl p-4">
            <TextGenerateEffectDemo />
          </p>
          </div>
        </div>
      </div>

      <img src="/Visual.png" alt="macbook" className="" />

      <div className="">
        <h1 className="text-center text-4xl text-white mb-4">Why does it exist</h1>
       <CardHoverEffectDemo />
      </div>

      <div>
        {/* <GridBackgroundDemo /> */}
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </div>
  );
}
