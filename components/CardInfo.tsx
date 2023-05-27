import { TarotCard } from "@/types";
import Image from "next/image";
import CardUI from "./CardUI";

interface CardInfoProps {
  card: TarotCard | undefined;
  onClose: () => void;
}

const CardInfo = ({ card, onClose }: CardInfoProps) => {
  const descriptions = [
    { title: "General meaning", text: card?.general_meaning },
    { title: "Positive meaning", text: card?.positive_meaning },
    { title: "Negative meaning", text: card?.negative_meaning },
    { title: "Advice", text: card?.advice },
    { title: "Career", text: card?.career },
    { title: "Feelings", text: card?.feelings?.join(", ") },
    { title: "Personality", text: card?.personality },
    { title: "Relationship", text: card?.relationship },
    { title: "Result of an action", text: card?.result_of_an_action },
    { title: "Warning", text: card?.warning },
  ];

  return (
    <section className="card-info flex flex-col h-full max-h-full overflow-y-auto scrollbar-hide">
      <header className="relative">
        <button onClick={onClose} className="fixed top-5 right-5">
          <Image src={`/img/close.svg`} alt="close" width="14" height="14" />
        </button>
      </header>
      <div className="py-6 px-16">
        <CardUI card={card} isLarge={true} />
      </div>
      <ul className="flex flex-wrap justify-center gap-2 px-4">
        {card?.keywords.map((keyword, index) => {
          return (
            <li
              key={index}
              className="py-1 px-3 font-semibold text-sm bg-purple-50 rounded-2xl"
            >
              {keyword}
            </li>
          );
        })}
      </ul>
      <ul className="flex flex-col gap-3 p-4 pb-20">
        {descriptions.map(({ title, text }, index) => (
          <li key={index} className="py-2 px-3 bg-purple-50 rounded-2xl">
            <h3 className="font-semibold">{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CardInfo;
