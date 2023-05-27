import { useRouter } from "next/router";
import { Category, SpreadProps } from "@/types";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Spread from "./Spread";
import { useRef } from "react";
import { useScroll } from "@/utils/useScroll";

interface SpreadsListProps {
  spreads: SpreadProps[];
  onBack: () => void;
  onSpreadSelect: (spread: SpreadProps) => void;
  selectedCategory: string;
  selectedCategoryObject?: Category | null;
}

const SpreadsList = ({
  spreads,
  onBack,
  onSpreadSelect,
  selectedCategory,
  selectedCategoryObject,
}: SpreadsListProps) => {
  const router = useRouter();
  const [showSpread, setShowSpread] = useState<SpreadProps>();
  const headerRef = useRef<HTMLDivElement | null>(null);
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

  /* const handleSpreadClick = (slug: string) => {
    router.push(`/spreads/${slug}`);
  }; */

  const handleSpreadClick = (spread: SpreadProps) => {
    //setShowSpread(spread);
    onSpreadSelect(spread);
  };

  useEffect(() => {
    if (headerRef.current) {
      setOffsetHeight(headerRef.current.offsetHeight);
    }
  }, [headerRef]);

  return (
    <section
      ref={scrollContainerRef}
      className="spreads-list relative flex flex-col h-full max-h-full overflow-y-auto scrollbar-hide"
    >
      <button onClick={onBack} className="fixed left-4 top-4 w-8 h-8 z-30">
        <Image src={`/img/arrow-left.svg`} alt="back" width="24" height="24" />
      </button>
      <header className="absolute top-0 left-0 right-0 z-0">
        <motion.div
          style={{ y: `${translateY}%` }}
          ref={headerRef}
          className={`relative flex flex-col pt-20 pb-10 px-4 rounded-t-3xl bg-${selectedCategoryObject?.color}-100 overflow-hidden`}
        >
          <span
            className={`absolute -left-[100px] -top-[150px] block w-[300px] h-[300px] rounded-[50%] bg-${selectedCategoryObject?.color}-200 z-0 opacity-60`}
          />
          <span
            className={`absolute -right-[170px] -bottom-[220px] block w-[400px] h-[400px] rounded-[50%] bg-${selectedCategoryObject?.color}-200 z-0 opacity-60`}
          />
          <h2 className="capitalize text-3xl font-bold mb-3 z-10">
            {selectedCategoryObject?.name}
          </h2>
          <p className="max-w-[65%] text-sm opacity-80 z-10">
            {selectedCategoryObject?.description}
          </p>
          <div className="absolute bottom-0 right-2 z-0">
            <Image
              src={`/img/${selectedCategoryObject?.slug}.svg`}
              alt={selectedCategoryObject?.name || ""}
              width="150"
              height="150"
            />
          </div>
        </motion.div>
      </header>
      <div
        className="h-full z-20"
        style={{ marginTop: `${headerRef?.current?.offsetHeight}px` }}
      >
        <ul
          className="flex flex-col gap-6 pt-6 pb-[10vh] px-4 bg-white rounded-tl-3xl z-10"
          style={{
            minHeight: `calc(98vh - ${headerRef?.current?.offsetHeight}px)`,
          }}
        >
          {spreads.map((spread) => (
            <motion.li
              key={spread.id}
              whileTap={{ scale: 0.95 }}
              /* onClick={() => handleSpreadClick(spread.slug)} */
              onClick={() => handleSpreadClick(spread)}
              className="grid grid-cols-[100px_auto] bg-white rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,.1)] cursor-pointer"
            >
              <div
                className={`grid grid-cols-12 gap-1 items-center justify-center p-2 rounded-l-3xl bg-gradient-to-b from-${selectedCategoryObject?.color}-100 to-${selectedCategoryObject?.color}-200`}
              >
                {spread.positions.map((pos, i) => {
                  return (
                    <span
                      key={i}
                      style={{ gridArea: pos.layout }}
                      className="aspect-[2/3] bg-white rounded-sm"
                    />
                  );
                })}
              </div>
              <div className="py-3 px-4">
                <h3 className={`mb-[2px] text-base font-bold`}>
                  {spread.name}
                </h3>
                <p className="text-sm opacity-80">{spread.description}</p>
                {/* {<Spread spread={spread} />} */}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SpreadsList;
