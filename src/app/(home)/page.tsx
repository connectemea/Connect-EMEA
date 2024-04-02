"use client";
// import { MacbookScrollDemo } from "./ui/Home/Macbook";
import { BackgroundBeamsDemo } from "@/app/ui/Home/HeroSection/Hero";
import { PiontCard } from "@/app//ui/Home/PointCardSection/PiontCard";
import { TextGenerateEffectDemo } from "@/app/ui/Home/FadeAnimationText/Text";
import Slider from "@/app/ui/Home/EventsSlideSection/Events";
import Team from "@/app/ui/Home/TeamSection/Team";
import Suggestion from "@/app/ui/Home/SuggestionSection/Suggestion";
import '@/app/styles/style.css';



export default function Home() {

  return (
    <div className="dark:bg-slate-50 dark:text-black bg-primary">
      <BackgroundBeamsDemo />
      <main className="custom-container flex flex-col gap-4">

        <section className=" flex  mx-auto flex-col lg:flex-row gap-10 my-10">
          <div className=" mx-auto">
            <img src="/Images/macbook.png" alt="macbook" className="w-full max-w-[400px] sm:max-w-full mx-auto" />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-4xl  md:text-6xl  mb-4 bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 font-extrabold">Who are we?</h1>
            <div className="dark:text-black text-white max-w-xl p-4 ">
              {/* <TextGenerateEffectDemo /> */}
              We are a vibrant student-led peer-to-peer learning community, aiming to empower every student to uplift their career aspirations via skill enhancement programs, mentorships, and enabling the right opportunities. Like the name itself, this community connects students of all different talents and skills, bringing them together and motivating them to be the best version of themselves.
            </div>
          </div>
        </section>


        <section className=" mb-10 mt-0 lg:my-10  mx-auto lg:px-10">
          <PiontCard />
        </section>

        {/* <section className=" flex  mx-auto flex-col lg:flex-row my-10">
          <div className="">
            <h1 className="text-6xl font-extrabold  mb-4 bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70">Benefits</h1>
            <div className="text-white max-w-xl p-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
          <div className=" ">
            <img src="/Images/benfit.png" alt="macbook" className="w-full" />
          </div>
        </section> */}

        <section className="my-10  lg:px-10">
          <h1 className="text-4xl md:text-6xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 my-10 font-extrabold text-center">Event</h1>
          <Slider />
        </section>

        <section className="my-10 mx-auto lg:px-10">
          <Team />
        </section>

        {/* <section className="my-10 mb-28 mx-auto lg:px-10">
          <Suggestion />
        </section> */}

        <section>
          <h1 className="text-4xl md:text-6xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 my-10 font-extrabold text-center">How to Join?
          </h1>
          <div className="my-20 text-center text-xl font-bold text-white  dark:text-black select-none flex gap-2 flex-col lg:flex-row ">
            <div className="flex min-w-full justify-around lg:min-w-fit">
              <div className="max-w-[250px] flex flex-col gap-2 items-center justify-center ">
                <div className="bg-gradient-to-b from-secondary to-violet h-24 w-24 rounded-2xl !rounded-bl-none" />
                <h1 className="text-md text-violet">step 1</h1>
                <p className="!font-normal text-[12px] leading-5">
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </p>
              </div>
              <img src="/img/curveline-3.svg" alt="arrow" className="w-28 block lg:hidden" />
            </div>

            <div className="flex items-start justify-start min-h-full w-full py-4">
              <img src="/img/curveline-1.svg" alt="arrow" className="w-60 hidden lg:block" />
            </div>

            <div className="flex min-w-full lg:min-w-fit justify-around">
              <img src="/img/curveline-4.svg" alt="arrow" className="w-36 block lg:hidden" />
              <div className="max-w-[250px] flex flex-col gap-2 items-center justify-center ">
                <div className="bg-gradient-to-b from-secondary to-violet h-24 w-24 rounded-2xl !rounded-bl-none" />
                <h1 className="text-md text-violet">step 2</h1>
                <p className="!font-normal text-[12px] leading-5">
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center min-h-full w-full py-4">
              <img src="/img/curveline-2.svg" alt="arrow" className="w-60  mb-10 hidden lg:block" />

            </div>
            <div className="max-w-[250px] flex flex-col gap-2 items-center justify-center ">
              <div className="bg-gradient-to-b from-secondary to-violet h-24 w-24 rounded-2xl !rounded-bl-none" />
              <h1 className="text-md text-violet">step 3</h1>
              <p className="!font-normal text-[12px] leading-5">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div >

  );
}
