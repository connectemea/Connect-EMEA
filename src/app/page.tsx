import Image from "next/image";
import { MacbookScrollDemo } from "../components/Macbook";
import {BackgroundBeamsDemo} from "../components/Hero";
import {CardHoverEffectDemo} from "../components/AdsCard";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className="flex flex-col  bg-neutral-900">
      <div>
       <NavBar />
       <BackgroundBeamsDemo />
      
      </div>
      <div className=" flex h-[400px] overflow-hidden mx-auto">
        <div className=" overflow-hidden ">

          <div className="">
            <div className="md:scale-50 h-full  -mt-40 p-6">
              <MacbookScrollDemo />
            </div>
          </div>

        </div>
        <div className="w-full h-full flex items-center justify-start">
          <div className="p-4 flex items-center justify-center flex-col">
          <h1 className="text-4xl text-white mb-4">Connect with your friends</h1>
          <p className="text-white max-w-xl p-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          </div>
        </div>
      </div>


      <div className="">
       <CardHoverEffectDemo />
      </div>
    </div>
  );
}
