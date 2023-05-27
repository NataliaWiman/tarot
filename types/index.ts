export interface Category {
  id: number;
  slug: string;
  name: string;
  color: string;
  description: string;
  short: string;
}

export interface TarotCard {
  name: string;
  number: number;
  suit: string;
  keywords: string[];
  general_meaning?: string;
  positive_meaning?: string;
  negative_meaning?: string;
  advice?: string;
  career?: string;
  feelings?: string[];
  personality?: string;
  relationship?: string;
  result_of_an_action?: string;
  warning?: string;
}

export interface Suit {
  title: string;
  cards: TarotCard[];
  slug: string;
}

export interface SpreadProps {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  layout: string[];
  number: number;
  positions: Position[];
}

export interface Position {
  id: string;
  name: string;
  layout: string;
}
