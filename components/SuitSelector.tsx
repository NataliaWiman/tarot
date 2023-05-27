import { Suit } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";

interface SuitSelectorProps {
  suits: Suit[];
  selectedSuit: string;
  onSuitSelected: (suit: string) => void;
}

const SuitSelector = ({
  suits,
  selectedSuit,
  onSuitSelected,
}: SuitSelectorProps) => {
  return (
    <div className="suit-selector px-4 py-3 grid grid-cols-5 justify-between">
      {suits.map((suit, index) => (
        <motion.button
          key={index}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSuitSelected(suit.slug)}
          className={`flex flex-col items-center ${
            suit.slug === selectedSuit ? "" : "opacity-50 grayscale"
          }`}
        >
          <Image
            src={`/img/${suit.slug}.svg`}
            alt="major arcana"
            width="40"
            height="40"
            className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px]"
          />
          <span className="mt-1 text-xs sm:text-sm font-semibold whitespace-nowrap">
            {suit.title}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default SuitSelector;
