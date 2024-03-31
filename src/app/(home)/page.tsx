"use client";
// import { MacbookScrollDemo } from "./ui/Home/Macbook";
import { BackgroundBeamsDemo } from "../ui/Home/Hero";
import { CardHoverEffectDemo } from "../ui/Home/PiontCard";
import { TextGenerateEffectDemo } from "../ui/Home/ConnectText";
import Slider from "../ui/Home/Events";
import Team from "../ui/Home/Team";
import Suggestion from "../ui/Home/Suggestion";
import '../ui/styles/style.css';



export default function Home() {

  return (
    <div className="bg-primary">
      <BackgroundBeamsDemo />
      <main className="custom-container flex flex-col gap-4">

        <section className=" flex  mx-auto flex-col lg:flex-row gap-10 my-10">
          <div className=" ">
            <img src="/Images/macbook.png" alt="macbook" className="w-full" />
          </div>
          <div className="">
            <h1 className="text-6xl  mb-4 bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 font-extrabold">Who are we?</h1>
            <div className="text-white max-w-xl p-4">
              {/* <TextGenerateEffectDemo /> */}
              A vibrant student-led community to empower every student to uplift their career aspirations via skill-enhancing programs, mentorship, and enabling the right opportunities
            </div>
          </div>
        </section>


        <section className="my-10  mx-auto lg:px-10">
          <CardHoverEffectDemo />
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
          <h1 className="text-6xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 my-10 font-extrabold text-center">Event</h1>
          <Slider />
        </section>

        <section className="my-10 mx-auto lg:px-10">
          <Team />
        </section>

        {/* <section className="my-10 mb-28 mx-auto lg:px-10">
          <Suggestion />
        </section> */}

        <section>
          <h1 className="text-6xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 my-10 font-extrabold text-center">How to Join?
          </h1>
          <div className="my-20 text-center text-xl font-bold text-white">
            Coming Soon!
          </div>
        </section>
      </main>
    </div >

  );
}
