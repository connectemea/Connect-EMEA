// import Image from "next/image";
import { HeroSection } from "@/components/HeroSection";
import { NavBar } from "@/components/NavBar";
import { Roboto } from "next/font/google";


const roboto = Roboto({ weight: ['400','500','700'], subsets: ["latin"] });

export default function Home() {

  return (
    <main
      className={`flex  flex-col items-center justify-between ${roboto.className}`}
    >
      <NavBar/>
      <HeroSection/>
    </main>
  );
}
