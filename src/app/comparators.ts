import { CommonProductComparator } from "@/features/common-product/CommonProductComparator";
import { ToiletPaperComparator } from "@/features/toilet-paper/ToiletPaperComparator";
import type { ComponentType } from "react";

export type ComparatorId = "common" | "toiletPaper";

export interface ComparatorDefinition {
  id: ComparatorId;
  label: string;
  Component: ComponentType;
}

export const comparators: ComparatorDefinition[] = [
  {
    id: "common",
    label: "Comum",
    Component: CommonProductComparator,
  },
  {
    id: "toiletPaper",
    label: "Papel higiênico",
    Component: ToiletPaperComparator,
  },
];
