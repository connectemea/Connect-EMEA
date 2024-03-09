import Image from "next/image";
import { MacbookScrollDemo } from "./ui/Home/Macbook";
import {BackgroundBeamsDemo} from "./ui/Home/Hero";
import {CardHoverEffectDemo} from "./ui/Home/AdsCard";
import { TextGenerateEffectDemo } from "./ui/Home/ConnectText";
import {GridBackgroundDemo} from "./ui/Home/Background";
import NavLinks from "./ui/NavBar";


export default function Home() {
  return (
    <div className="flex flex-col  bg-custom-bg">
      <div>
       <NavLinks />
       <BackgroundBeamsDemo />
      </div>
      <div className=" flex max-h-[450px] overflow-hidden mx-auto">
        <div className=" overflow-hidden ">
          <div className="">
            <div className=" md:scale-50 h-full  -mt-40 p-6">
              <MacbookScrollDemo />
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


      <div className="">
        <h1 className="text-center text-4xl text-white mb-4">Why does it exist</h1>
       <CardHoverEffectDemo />
      </div>

      <div>
        {/* <GridBackgroundDemo /> */}
      </div>
    </div>
  );
}
