import { TarotCard } from "@/types";

interface FilterTarotCardsOptions {
  searchQuery?: string;
  suit?: string;
}

const filterTarotCards = (
  tarotCards: TarotCard[],
  options: FilterTarotCardsOptions
): TarotCard[] => {
  let filteredCards = tarotCards;

  if (options.searchQuery) {
    const searchQuery = options.searchQuery.toLowerCase();
    filteredCards = filteredCards.filter((card) =>
      card.name.toLowerCase().includes(searchQuery)
    );
  }

  if (options.suit) {
    filteredCards = filteredCards.filter((card) => card.suit === options.suit);
  }

  return filteredCards;
};

export default filterTarotCards;
