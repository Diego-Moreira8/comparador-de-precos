import type { ComparableItem } from "../comparison/types";

export interface ToiletPaperItem extends ComparableItem {
  priceInput: string;
  rollCountInput: string;
  rollLengthInput: string;
  totalLength: number | null;
}
