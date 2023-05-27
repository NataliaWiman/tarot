import { useEffect, useRef, useState } from "react";
import SelectionModal from "@/components/SelectionModal";
import { TarotCard, SpreadProps, Position } from "@/types";
import Image from "next/image";
import SingleCard from "./SingleCard";
import categoriesData from "@/public/categories.json";
import { AnimatePresence, motion } from "framer-motion";

interface SpreadProppies {
  spread: SpreadProps;
  onBack: () => void;
  onClose: () => void;
}

const Spread = ({ spread, onBack, onClose }: SpreadProppies) => {
  const [selectedCards, setSelectedCards] = useState<Record<string, TarotCard>>(
    {}
  );
  const [currentPosition, setCurrentPosition] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const category = categoriesData.find(
    (category) => category.name === spread.category
  );

  const spreadRef = useRef<HTMLDivElement | null>(null);
  const [offsetHeight, setOffsetHeight] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        const maxScrollTop =
          scrollContainerRef.current.scrollHeight -
          scrollContainerRef.current.clientHeight;
        setScrollProgress(scrollTop / maxScrollTop);
      }
    };

    const currentRef = scrollContainerRef.current;

    currentRef?.addEventListener("scroll", handleScroll);

    return () => currentRef?.removeEventListener("scroll", handleScroll);
  }, []);

  const translateY = scrollProgress * 50; // 50% of the container's height

  useEffect(() => {
    if (spreadRef.current) {
      setOffsetHeight(spreadRef.current.offsetHeight);
    }
  }, [spreadRef]);

  const openModal = (positionId: string) => {
    setCurrentPosition(positionId);
    setIsModalOpen(true);
  };

  const selectCard = (card: TarotCard) => {
    setSelectedCards((prevSelectedCards) => ({
      ...prevSelectedCards,
      [currentPosition]: card,
    }));
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const generatePrompt = (positions: Position[]) => {
    const spreadContext = `Can you please provide a detailed and thorough interpretation of the "${spread.name}" Tarot spread? The cards drawn are: `;
    const positionContexts = positions.map(
      (position) =>
        `${selectedCards[position.id].name} on position for '${position.name}' `
    );

    setPrompt(`${spreadContext} ${positionContexts.join(", ")}.`);
    setShowPrompt(true);
  };

  const closePrompt = () => {
    setShowPrompt(false);
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopySuccess(true);
    } catch (err) {
      console.log("Failed to copy text: ", err);
    }
  };

  const appearVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 0.3 },
  };

  return (
    <section
      ref={scrollContainerRef}
      className="spread relative flex flex-col h-full max-h-full overflow-y-auto scrollbar-hide"
    >
      <button onClick={onBack} className="fixed left-4 top-4 w-8 h-8 z-30">
        <Image src={`/img/arrow-left.svg`} alt="back" width="24" height="24" />
      </button>
      <button onClick={onClose} className="fixed right-2 top-4 w-8 h-8 z-30">
        <Image src={`/img/close.svg`} alt="back" width="16" height="16" />
      </button>
      <header className="absolute top-0 left-0 right-0 z-0">
        <motion.div
          style={{ y: `${translateY}%` }}
          ref={spreadRef}
          className={`relative flex flex-col rounded-t-3xl overflow-hidden`}
        >
          <span
            className={`absolute -left-[100px] -top-[150px] block w-[300px] h-[300px] rounded-[50%] bg-${category?.color}-200 z-0 opacity-60`}
          />
          <span
            className={`absolute -right-[170px] -bottom-[220px] block w-[400px] h-[400px] rounded-[50%] bg-${category?.color}-200 z-0 opacity-60`}
          />
          <h1 className="mx-auto pt-[18px] font-bold text-lg z-10">
            {spread.name}
          </h1>
          <div className="px-4 pt-4 pb-5 z-10">
            <div
              className={`grid grid-cols-10 gap-2 items-center justify-center rounded-l-3xl`}
            >
              {spread.positions.map((position, i) => {
                const selectedCard = selectedCards[position.id];
                const flipped = Boolean(selectedCard);
                return (
                  <SingleCard
                    key={i}
                    position={position}
                    color={category?.color}
                    onCardClick={openModal}
                    flipped={flipped}
                    selectedCard={selectedCard}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      </header>

      <div
        className="h-full z-20"
        style={{ marginTop: `${spreadRef?.current?.offsetHeight}px` }}
      >
        <div
          className="flex flex-col gap-4 pt-6 pb-[20vh] px-4 bg-white rounded-tl-3xl z-10"
          style={{
            minHeight: `calc(98vh - ${spreadRef?.current?.offsetHeight}px)`,
          }}
        >
          <h3 className="font-bold text-lg">Positions:</h3>
          <ul className="grid gap-3">
            {spread.positions.map((position) => (
              <li key={position.id}>
                <p className="flex gap-2">
                  <span
                    className={`flex items-center justify-center mt-1 min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] font-bold text-sm text-white rounded-xl bg-${category?.color}-200`}
                  >
                    {position.id}
                  </span>
                  <span className="font-bold text-base">{position.name}</span>
                </p>
                <p className="pl-8">
                  {selectedCards[position.id]?.name || (
                    <span className="text-sm text-stone-500">
                      Select a card
                    </span>
                  )}
                </p>
              </li>
            ))}
          </ul>
          <button
            onClick={() => generatePrompt(spread.positions)}
            className="flex items-center justify-center gap-2 mx-auto mt-4 py-3 px-5 font-bold text-sm text-white rounded-3xl  bg-rose-300"
          >
            Generate ChatGPT Prompt
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {prompt && showPrompt && (
          <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: "0" }}
            exit={{ y: "100vh" }}
            transition={{ type: "spring", bounce: 0.15 }}
            className="fixed top-[10%] w-[90%] ml-[5%] pb-5 bg-white rounded-3xl  z-40"
          >
            <h2 className="p-4 font-semibold text-base">Your Prompt</h2>
            <button onClick={closePrompt} className="absolute top-5 right-5">
              <Image
                src={`/img/close.svg`}
                alt="close"
                width="14"
                height="14"
              />
            </button>
            <div className="relative px-4 flex flex-col">
              <p className="p-4 max-h-[40vh] bg-stone-100 text-sm rounded-2xl overflow-y-auto scrollbar-hide">
                {prompt}
              </p>
              <button
                onClick={handleCopyPrompt}
                className="flex items-center justify-center gap-2 mx-auto mt-4 py-2 px-4 font-bold text-sm text-white rounded-2xl  bg-rose-300"
              >
                <Image
                  src={`/img/copy.svg`}
                  alt="copy"
                  width="14"
                  height="14"
                />
                Copy to clipboard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showPrompt || isModalOpen ? (
        <AnimatePresence mode="wait">
          {
            <motion.div
              variants={appearVariants}
              initial="initial"
              animate={isModalOpen || showPrompt ? "animate" : "initial"}
              className="fixed top-0 left-0 right-0 bottom-0 bg-black z-20"
            />
          }
        </AnimatePresence>
      ) : null}

      <AnimatePresence mode="wait">
        {isModalOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0.15 }}
            className={`fixed bottom-0 flex justify-center pt-[10vh] w-full max-w-screen-sm h-[98vh] max-h-[98vh] rounded-t-3xl overflow-hidden z-20`}
          >
            <SelectionModal
              selectCard={selectCard}
              close={closeModal}
              position={currentPosition}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Spread;
