import type { ComparableItem } from "../comparison/types";

export interface Unit {
  name: string;
  abbreviation: string;
}

export interface CommonProductItem extends ComparableItem {
  priceInput: string;
  amountInput: string;
}

export const units: Unit[] = [
  { name: "Unidade", abbreviation: "UN" },
  { name: "Quilograma", abbreviation: "KG" },
  { name: "Grama", abbreviation: "G" },
  { name: "Litro", abbreviation: "L" },
  { name: "Mililitro", abbreviation: "ML" },
];
