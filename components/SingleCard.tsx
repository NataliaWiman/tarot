import { Position, TarotCard } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import CardUI from "./CardUI";

interface SingleCardProps {
  position: Position;
  color: string | undefined;
  onCardClick: (positionId: string) => void;
  flipped: boolean;
  selectedCard: TarotCard | undefined;
}

const SingleCard = ({
  position,
  color,
  onCardClick,
  flipped,
  selectedCard,
}: SingleCardProps) => {
  const handleCardClick = () => {
    if (!flipped) {
      onCardClick(position.id);
    }
  };

  const flipTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
  };

  const cardVariants = {
    unflipped: { rotateY: 180 },
    flipped: { rotateY: 0 },
  };

  const contentVariants = {
    unflipped: { rotateY: 0 },
    flipped: { rotateY: -180 },
  };

  return (
    <motion.div
      onClick={handleCardClick}
      whileTap={{ scale: 0.95 }}
      className="aspect-[2/3] bg-white rounded-2xl shadow-md cursor-pointer"
      style={{ gridArea: position.layout }}
      animate={flipped ? "flipped" : "unflipped"}
      variants={cardVariants}
      transition={flipTransition}
    >
      {flipped ? (
        <CardUI card={selectedCard} />
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          <span className="unflip flex items-center justify-center pt-[3px] font-bold text-white text-sm leading-none z-10">
            {position.id}
          </span>
          <Image
            src="/img/star.svg"
            alt="icon"
            width="40"
            height="40"
            className="absolute w-[70%]"
          />
        </div>
      )}
      {/* {flipped ? (
        selectedCard?.suit === "Major Arcana" ? (
          <motion.div
            className="relative h-full w-full flex items-center justify-center"
            animate={flipped ? "flipped" : "unflipped"}
            variants={contentVariants}
          >
            <Image
              src={`/img/major/${selectedCard.number}.svg`}
              alt="major arcana"
              width="40"
              height="40"
              className="w-[full]"
            />
          </motion.div>
        ) : (
          <motion.div
            className="relative h-full w-full flex flex-col items-center justify-center"
            animate={flipped ? "flipped" : "unflipped"}
            variants={contentVariants}
          >
            <span className="flex justify-center items-center mb-2 px-2 mx-auto text-[18px] text-stone-500 font-bold rounded-xl">
              {selectedCard?.number}
            </span>
            <Image
              src={`/img/minor/${selectedCard?.suit}.svg`}
              alt="minor suit"
              width="20"
              height="20"
              className="mx-auto px-2 w-[80%]"
            />
          </motion.div>
        )
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          <span className="flex items-center justify-center pt-[3px] font-bold text-white text-sm leading-none z-10">
            {position.id}
          </span>
          <Image
            src="/img/star.svg"
            alt="icon"
            width="40"
            height="40"
            className="absolute w-[70%]"
          />
        </div>
      )} */}
    </motion.div>
  );
};

export default SingleCard;
