import { useState } from "react";
import tarotCards from "@/public/tarotCards.json";
import Search from "@/components/Search";
import filterCards from "@/utils/filterCards";
import { TarotCard, Suit } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";
import CardUI from "./CardUI";
import SuitSelector from "./SuitSelector";

interface SelectionModalProps {
  selectCard: (card: TarotCard) => void;
  close: () => void;
  position: string;
}

const SelectionModal = ({
  selectCard,
  close,
  position,
}: SelectionModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSuit, setSelectedSuit] = useState("major");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTarotCards = filterCards(tarotCards, { searchQuery });

  const major = filteredTarotCards.filter(
    (card: TarotCard) => card.suit === "Major Arcana"
  );
  const cups = filteredTarotCards.filter(
    (card: TarotCard) => card.suit === "Cups"
  );
  const wands = filteredTarotCards.filter(
    (card: TarotCard) => card.suit === "Wands"
  );
  const swords = filteredTarotCards.filter(
    (card: TarotCard) => card.suit === "Swords"
  );
  const pentacles = filteredTarotCards.filter(
    (card: TarotCard) => card.suit === "Pentacles"
  );

  const suits: Suit[] = [
    { title: "Major Arcana", cards: major, slug: "major" },
    { title: "Cups", cards: cups, slug: "cups" },
    { title: "Wands", cards: wands, slug: "wands" },
    { title: "Swords", cards: swords, slug: "swords" },
    { title: "Pentacles", cards: pentacles, slug: "pentacles" },
  ];

  const handleSuitPreview = (suit: string) => {
    setSelectedSuit(suit);
  };

  const renderCardsList = (cards: TarotCard[]) => (
    <ul className="grid grid-cols-5 gap-2 pb-2 ">
      {cards.map((card: TarotCard) => (
        <li key={card.number} onClick={() => selectCard(card)}>
          <CardUI card={card} />
        </li>
      ))}
    </ul>
  );

  const renderSuggestions = (cards: TarotCard[]) => (
    <ul className="grid grid-cols-5 gap-0 max-w-full">
      {cards.map((card: TarotCard) => (
        <li
          key={card.number}
          className="cards flex flex-col m-1 min-h-[100%] cursor-pointer"
          onClick={() => selectCard(card)}
        >
          <CardUI card={card} />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="selection-modal fixed pb-3 w-full max-w-[94%] mx-auto bg-white rounded-3xl z-30">
      <h2 className="p-4 font-semibold text-base">
        Select card for position {position}
      </h2>
      <button onClick={close} className="absolute top-5 right-5">
        <Image src={`/img/close.svg`} alt="close" width="14" height="14" />
      </button>
      <div className="px-4 py-2">
        <Search
          value={searchQuery}
          onChange={handleSearchChange}
          suits={suits}
          selectCard={selectCard}
        />
      </div>
      <SuitSelector
        suits={suits}
        selectedSuit={selectedSuit}
        onSuitSelected={handleSuitPreview}
      />
      {selectedSuit &&
        suits
          .filter((suit: Suit) => suit.cards.length > 0)
          .map(
            (suit: Suit) =>
              selectedSuit === suit.slug && (
                <div
                  key={suit.title}
                  className="px-2 max-h-[40vh] overflow-y-auto overflow-x-hidden scrollbar-hide"
                >
                  {renderSuggestions(suit.cards)}
                </div>
              )
          )}
    </section>
  );
};

export default SelectionModal;
