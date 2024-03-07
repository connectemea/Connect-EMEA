// import Image from "next/image";
import { HeroSection } from "../components/HeroSection";
import { NavBar } from "../components/NavBar";
import { MacbookScrollDemo } from "../components/Macbook.tsx";
import {BentoGridDemo} from "../components/Text.tsx";
import { Roboto } from "next/font/google";


const roboto = Roboto({ weight: ['400','500','700'], subsets: ["latin"] });

export default function Home() {

  return (
    <main>
      <MacbookScrollDemo />
      <BentoGridDemo />
    </main>
  );
}
