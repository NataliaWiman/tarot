import { Suit, TarotCard } from "@/types";
import { useState } from "react";
import tarotCards from "@/public/tarotCards.json";
import CardInfo from "@/components/CardInfo";
import CardUI from "@/components/CardUI";
import SuitSelector from "@/components/SuitSelector";
import Search from "@/components/Search";
import { AnimatePresence, motion } from "framer-motion";

const CardsLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSuit, setSelectedSuit] = useState("major");
  const [selectedCard, setSelectedCard] = useState<TarotCard>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const allMajor = tarotCards.filter(
    (card: TarotCard) => card.suit === "Major Arcana"
  );
  const allCups = tarotCards.filter((card: TarotCard) => card.suit === "Cups");
  const allWands = tarotCards.filter(
    (card: TarotCard) => card.suit === "Wands"
  );
  const allSwords = tarotCards.filter(
    (card: TarotCard) => card.suit === "Swords"
  );
  const allPentacles = tarotCards.filter(
    (card: TarotCard) => card.suit === "Pentacles"
  );

  const suits: Suit[] = [
    { title: "Major Arcana", cards: allMajor, slug: "major" },
    { title: "Cups", cards: allCups, slug: "cups" },
    { title: "Wands", cards: allWands, slug: "wands" },
    { title: "Swords", cards: allSwords, slug: "swords" },
    { title: "Pentacles", cards: allPentacles, slug: "pentacles" },
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

  const selectCard = (card: TarotCard) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedCard(undefined);
    setIsModalOpen(false);
  };

  const slideUpVariants = {
    initial: { y: "100%" },
    animate: { y: "0" },
    exit: { y: "100%" },
  };

  const appearVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 0.3 },
  };

  return (
    <main className="flex flex-col">
      <header className="mx-4 p-4 rounded-3xl bg-purple-200">
        <h1 className="text-xl font-bold">Cards</h1>
      </header>

      <section className="px-4">
        <Search
          value={searchQuery}
          onChange={handleSearchChange}
          suits={suits}
          selectCard={selectCard}
        />
      </section>

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
                  className="cards-list px-2 overflow-y-auto overflow-x-hidden scrollbar-hide"
                >
                  {renderCardsList(suit.cards)}
                </div>
              )
          )}

      {isModalOpen ? (
        <AnimatePresence mode="wait">
          {
            <motion.div
              variants={appearVariants}
              initial="initial"
              animate={isModalOpen ? "animate" : "initial"}
              className="fixed top-0 left-0 right-0 bottom-0 bg-black z-20"
            />
          }
        </AnimatePresence>
      ) : null}

      <AnimatePresence>
        {isModalOpen && selectedCard ? (
          <motion.div
            key={selectedCard?.number}
            variants={slideUpVariants}
            initial="initial"
            animate={selectedCard ? "animate" : "initial"}
            exit="exit"
            transition={{ type: "spring", bounce: 0.15 }}
            className={`fixed bottom-0 w-full max-w-screen-sm h-[98vh] max-h-[98vh] bg-purple-100 rounded-t-3xl overflow-hidden z-20`}
          >
            <CardInfo card={selectedCard} onClose={() => handleClose()} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
};

export default CardsLayout;
