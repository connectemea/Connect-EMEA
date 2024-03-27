import Link from 'next/link';
import { BsCaretRight } from "react-icons/bs";

export function CardHoverEffectDemo() {
  return (
    <div className="flex gap-4 flex-col items-center justify-center ">
      <div>

      <h1 className="text-6xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 my-10 font-extrabold">Why does it exist</h1>
      </div>
      <div className="flex flex-wrap gap-4 gap-y-6 mx-auto items-center justify-center">

    {cards.map((card, index) => (
      <div key={index} className="max-w-[360px] cursor-default">
        <div className="m-2 bg-white/10 backdrop-blur border shadow-lg rounded-lg p-4 text-white transition-all ease-in duration-300 hover:-translate-y-2 hover:border-secondary">
          <div className='flex gap-1'>
            <div className='items-start'>
              <span>
                <BsCaretRight className='text-[28px] text-secondary'/>
          {/* <img src='/icons/arrow.png' alt='notification' /> */}
              </span>

              </div>
              <div className='flex-1'>
          {/* <span className="text-6xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 font-extrabold">0{index + 1}</span> */}
          <h2 className="text-xl font-semibold">{card.title}</h2>
          <p className="text-gray-500 mt-2">{card.description}</p>
          {/* <Link
            href={card.link}
            rel="noopener noreferrer"
            className="text-blue-500 mt-2 block"
          >
            Learn more
          </Link> */}
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
    title: "Point Card 1",
    description:
      "A technology company that builds economic infrastructure for the for the internet.economic infrastructure for the internet.documentaries, and more ",
    link: "/team/1",
  },
  {
    title: "Point Card 2",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime,  of internet-connected devices.documentaries, and more ",
    link: "/team/2",
  },
  {
    title: "Point Card 3",
    description:
      "A multinational technology company that specializes in Internet-related services and products.fers a wide variety of award-winning TV shows, ",
    link: "/team/3",
  },
  {
    title: "Point Card 4",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together. movies, anime,",
    link: "/team/4",
  },
  {
    title: "Point Card 5",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.internet. movies, anime, ",
    link: "/team/5",
  },
];
