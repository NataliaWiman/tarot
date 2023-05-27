import CategoryList from "@/components/CategoryList";
import SpreadsList from "@/components/SpreadsList";
import { useState } from "react";
import spreads from "@/public/spreads.json";
import { AnimatePresence, motion } from "framer-motion";
import { Category } from "@/types";
import categoriesData from "@/public/categories.json";

const SpreadsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
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
    <div>
      <h1>Spreads</h1>
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
          {showSpreads ? (
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
              className={`fixed top-0 w-full max-w-screen-sm h-full mt-3 bg-${selectedCategory?.color}-100 rounded-t-3xl z-20`}
            >
              <SpreadsList
                spreads={filteredSpreads}
                selectedCategory={selectedCategory?.name || ""}
                selectedCategoryObject={selectedCategory}
                onBack={() => setShowSpreads(false)}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SpreadsPage;
