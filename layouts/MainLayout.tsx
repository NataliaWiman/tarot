import SelectionModal from "@/components/SelectionModal";
import { AnimatePresence, motion } from "framer-motion";
import { SetStateAction, useState } from "react";
import SpreadsLayout from "./SpreadsLayout";
import Image from "next/image";
import CardsLayout from "./CardsLayout";

const MainLayout = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const menuItems = ["spreads", "cards"];

  const slideSidewaysVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
    }),
    animate: { opacity: 1, x: 0 },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
    }),
  };

  const switchPage = (nextPage: SetStateAction<number>) => {
    setLoading(true);
    setTimeout(() => {
      setPage(nextPage);
      setLoading(false);
    }, 500);
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 mx-auto pt-10 pb-32 min-h-[100vh] max-h-[100vh] max-w-screen-sm overflow-x-hidden overflow-y-auto scrollbar-hide">
      <AnimatePresence initial={false} custom={page}>
        {!loading && (
          <>
            {page === 1 && (
              <motion.div
                key="page1"
                custom={-1} // direction
                variants={slideSidewaysVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <SpreadsLayout />
              </motion.div>
            )}

            {page === 2 && (
              <motion.div
                key="page2"
                custom={1} // direction
                variants={slideSidewaysVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <CardsLayout />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
      <div className="fixed bottom-0 left-0 right-0 flex justify-center gap-9 items-center pt-2 pb-3 rounded-t-3xl bg-white shadow-[0_0_60px_-15px_rgba(0,0,0,0.3)] z-30">
        {menuItems.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`flex items-center gap-2 py-1 px-3 rounded-2xl ${
                page === index + 1 ? "bg-rose-300" : ""
              }`}
            >
              <Image
                src={`/img/icon-${item}-${
                  page === index + 1 ? "on" : "off"
                }.svg`}
                alt={item}
                width="20"
                height="20"
              />
              <span
                className={`pt-[2px] capitalize text-[12px] font-bold  ${
                  page === index + 1 ? "text-white" : "text-rose-400"
                }`}
              >
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default MainLayout;
