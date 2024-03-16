
export function CardHoverEffectDemo() {
  return (
    <div className="flex gap-4 flex-col items-center justify-center ">
      <div>

      <h1 className="text-4xl gradient mb-4">Why does it exist</h1>
      </div>
      <div className="flex gap-10 flex-wrap">

    {cards.map((card, index) => (
      <div key={index} className="max-w-5xl mx-auto px-8 max-w-[500px]">
        <div className="bg-custom-bg border shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold">{card.title}</h2>
          <p className="text-gray-500 mt-2">{card.description}</p>
          <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 mt-2 block"
          >
            Learn more
          </a>
        </div>
      </div>
      ))}
   
   </div>
    </div>

  );
}
export const cards = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];
