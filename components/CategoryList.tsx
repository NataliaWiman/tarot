import React from "react";
import categoriesData from "@/public/categories.json";
import { motion } from "framer-motion";
import { Category, SpreadProps } from "@/types";
import Image from "next/image";

interface CategoryListProps {
  categories: Category[];
  spreads: SpreadProps[];
  selectedCategory: Category | null;
  onCategorySelect: (category: Category) => void;
}

const CategoryList = ({
  categories,
  spreads,
  selectedCategory,
  onCategorySelect,
}: CategoryListProps) => {
  const sortedCategories = categories
    .map((category) => {
      const matchingCategory = categoriesData.find(
        (cat) => cat.name === category.name
      );
      const spreadCount = spreads.filter(
        (spread) => spread.category === category.name
      ).length;

      return {
        id: matchingCategory ? matchingCategory.id : 0,
        name: matchingCategory ? matchingCategory.name : "",
        description: matchingCategory ? matchingCategory.description : "",
        short: matchingCategory ? matchingCategory.short : "",
        color: matchingCategory ? matchingCategory?.color : "",
        slug: matchingCategory ? matchingCategory?.slug : "",
        count: spreadCount,
      };
    })
    .sort((a, b) => a.id - b.id);

  return (
    <ul className="grid gap-5 px-3 py-5">
      {sortedCategories.map((category) => (
        <motion.li
          key={category.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategorySelect(category)}
          className={`relative px-5 pt-3 pb-4 grid grid-cols-[1fr_90px] gap-2 justify-between bg-${category.color}-100 rounded-3xl cursor-pointer overflow-hidden ${category.name} `}
        >
          <span
            className={`absolute -left-[100px] -top-[140px] block w-[250px] aspect-square rounded-[50%] bg-${category?.color}-200 z-0 opacity-40`}
          />
          <span
            className={`absolute -right-[110px] -bottom-[170px] block w-[300px] aspect-square rounded-[50%] bg-${category?.color}-200 z-0 opacity-50`}
          />
          <div className="z-10">
            <h2 className="text-lg font-bold capitalize">{category.name}</h2>
            <p className="text-xs text-gray-600">{category.short}</p>
            <p className="mt-3 px-2 max-w-fit text-[11px] font-bold uppercase bg-white rounded-xl">
              {category.count} spread{category.count > 1 ? "s" : null}
            </p>
          </div>
          <div className="absolute bottom-0 right-5">
            <Image
              src={`/img/${category.slug}.svg`}
              alt={category.name}
              width="100"
              height="100"
            />
          </div>
        </motion.li>
      ))}
    </ul>
  );
};

export default CategoryList;
