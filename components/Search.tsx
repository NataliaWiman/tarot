import { ChangeEvent } from "react";
import { Suit, TarotCard } from "@/types";
import CardUI from "./CardUI";
import Image from "next/image";

interface SearchProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  suits: Suit[];
  selectCard: (card: TarotCard) => void;
}

const Search = ({ value, onChange, suits, selectCard }: SearchProps) => {
  const renderCardsList = (cards: TarotCard[]) => (
    <ul className="grid grid-cols-5 gap-2 pb-2 ">
      {cards.map((card: TarotCard) => (
        <li key={card.number} onClick={() => selectCard(card)}>
          <CardUI card={card} />
        </li>
      ))}
    </ul>
  );

  const emptySearch = () => {
    onChange({
      target: {
        value: "",
      },
    } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="search relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search cards..."
        className="w-full px-4 py-3 text-sm rounded-2xl border-2 focus:border-rose-200 outline-none"
      />
      <button onClick={emptySearch} className="absolute top-[18px] right-4">
        <Image
          src={`/img/close.svg`}
          alt="close"
          width="12"
          height="12"
          className="opacity-50"
        />
      </button>
      {value && (
        <div className="absolute left-0 right-0 top-13 py-4 max-h-[40vh] bg-white rounded-2xl shadow-lg overflow-y-auto z-10 scrollbar-hide">
          {suits
            .filter((suit: Suit) => suit.cards.length > 0)
            .map((suit: Suit) => (
              <div key={suit.title} className="px-2">
                {renderCardsList(suit.cards)}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;
