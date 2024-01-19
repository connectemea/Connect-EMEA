// import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <video autoPlay loop muted className="object-cover w-full h-full fixed inset-0 z-[-1]">
        <source src="/black.mp4" type="video/mp4" />
      </video>
      <div className="p-4 rounded-md shadow-md m-auto bg-white">
       <h3 className="text-xl font-bold">Connect New Website</h3>
      </div>
    </main>
  );
}
