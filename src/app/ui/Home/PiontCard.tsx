import Link from 'next/link';
import { BsCaretRight } from "react-icons/bs";

export function CardHoverEffectDemo() {
  return (
    <div className="flex gap-4 flex-col items-center justify-center ">
      <div>

        <h1 className="text-6xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 my-10 font-extrabold">Why do you want to join us?</h1>
      </div>
      <div className="flex flex-wrap gap-4 gap-y-6 mx-auto items-center justify-center">

        {cards.map((card, index) => (
          <div key={index} className=" cursor-default">
            <div className="max-w-[340px] min-h-[180px] m-2 bg-white/10 backdrop-blur border border-gray-700 shadow-lg rounded-[25px] p-4 text-white transition-all ease-in duration-300 hover:-translate-y-1 hover:border-secondary">
              <div className='flex gap-1'>
                <div className='items-start'>
                  <span>
                    <BsCaretRight className='text-[28px] text-secondary' />
                    {/* <img src='/icons/arrow.png' alt='notification' /> */}
                  </span>

                </div>
                <div className='flex-1'>
                  {/* <span className="text-6xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 font-extrabold">0{index + 1}</span> */}
                  <h2 className="text-xl font-semibold">{card.title}</h2>
                  <p className="text-gray-500 mt-4">{card.description}</p>

                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>

  );
}
export const cards = [
  {
    title: "Networking",
    description:
      "Expand your network with like-minded peers and industry professionals for career opportunities.",
  },
  {
    title: "Skill Development",
    description:
      "Enhance your skills through workshops and boot camps led by experts in various fields.",
  },
  {
    title: "Alumni Meets",
    description:
      "Get motivated and inspired by successful alumni and industry leaders through engaging talk sessions.",
  },
  {
    title: "Community Support",
    description:
      "Receive support and guidance from fellow students and mentors to navigate your career journey.",
  },
  {
    title: "Career Advancement",
    description:
      "Gain valuable insights and resources to excel in your chosen career path, all for free.",
  },
];
