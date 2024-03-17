import Link from 'next/link';

export function CardHoverEffectDemo() {
  return (
    <div className="flex gap-4 flex-col items-center justify-center ">
      <div>

      <h1 className="text-6xl gradient my-10 font-extrabold">Why does it exist</h1>
      </div>
      <div className="flex gap-10 flex-wrap">

    {cards.map((card, index) => (
      <div key={index} className="max-w-5xl mx-auto px-8 max-w-[500px]">
        <div className="bg-white/10 backdrop-blur border shadow-lg rounded-lg p-4 text-white transition-all ease-in duration-300 hover:-translate-y-4 hover:border-secondary">
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
      ))}
   
   </div>
    </div>

  );
}
export const cards = [
  {
    title: "Point Card 1",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "/team/1",
  },
  {
    title: "Point Card 2",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "/team/2",
  },
  {
    title: "Point Card 3",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "/team/3",
  },
  {
    title: "Point Card 4",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "/team/4",
  },
  {
    title: "Point Card 5",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "/team/5",
  },
  {
    title: "Point Card 6",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "/team/6",
  },
];
