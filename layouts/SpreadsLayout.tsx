import CategoryList from "@/components/CategoryList";
import SpreadsList from "@/components/SpreadsList";
import { useState } from "react";
import spreads from "@/public/spreads.json";
import { AnimatePresence, motion } from "framer-motion";
import { Category, SpreadProps } from "@/types";
import categoriesData from "@/public/categories.json";
import Spread from "@/components/Spread";

const SpreadsLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSpread, setSelectedSpread] = useState<SpreadProps | null>(
    null
  );
  const [showSpreads, setShowSpreads] = useState(false);

  const categories = Array.from(
    new Set(spreads.map((spread) => spread.category))
  )
    .map((categoryName) => {
      const categoryDetails = categoriesData.find(
        (category) => category.name === categoryName
      );
      return categoryDetails || null;
    })
    .filter((category): category is Category => category !== null);

  const filteredSpreads = selectedCategory
    ? spreads.filter((spread) => spread.category === selectedCategory.name)
    : spreads;

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setShowSpreads(true);
  };

  const handleSpreadSelect = (spread: SpreadProps) => {
    setShowSpreads(false);
    setSelectedSpread(spread);
  };

  const handleCloseSpread = () => {
    setSelectedSpread(null);
    setShowSpreads(true);
  };

  const handleCloseAll = () => {
    setSelectedSpread(null);
    setShowSpreads(false);
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
        <h1 className="text-xl font-bold">Categories</h1>
      </header>

      <motion.div className="overflow-x-hidden max-w-[100%]">
        <motion.div className="w-full">
          <CategoryList
            spreads={spreads}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </motion.div>
        <AnimatePresence mode="wait">
          {showSpreads || selectedSpread ? (
            <motion.div
              variants={appearVariants}
              initial="initial"
              animate={selectedCategory ? "animate" : "initial"}
              className="fixed top-0 left-0 right-0 bottom-0 bg-black z-20"
            />
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {showSpreads ? (
            <motion.div
              key={selectedCategory?.id}
              variants={slideUpVariants}
              initial="initial"
              animate={selectedCategory ? "animate" : "initial"}
              exit="exit"
              transition={{ type: "spring", bounce: 0.15 }}
              /* drag="y"
              dragConstraints={{ top: -100, bottom: 0 }}
              onDragEnd={(event, info) => {
                if (info.point.y > 700) {
                  setShowSpreads(false);
                }
              }} */
              className={`fixed bottom-0 w-full max-w-screen-sm h-[98vh] max-h-[98vh] bg-${selectedCategory?.color}-100 rounded-t-3xl overflow-hidden z-20`}
            >
              <SpreadsList
                spreads={filteredSpreads}
                selectedCategory={selectedCategory?.name || ""}
                selectedCategoryObject={selectedCategory}
                onBack={() => setShowSpreads(false)}
                onSpreadSelect={handleSpreadSelect}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {selectedSpread && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0.15 }}
              className={`fixed bottom-0 w-full max-w-screen-sm h-[98vh] max-h-[98vh] bg-${selectedCategory?.color}-100 rounded-t-3xl overflow-hidden z-20`}
            >
              <Spread
                spread={selectedSpread}
                onBack={() => handleCloseSpread()}
                onClose={() => handleCloseAll()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
};

export default SpreadsLayout;
