import type { ComparableItem } from "./types";

interface ComparisonRatios {
  betterRatio: number | null;
  worstRatio: number | null;
}

export function getComparisonRatios(items: ComparableItem[]): ComparisonRatios {
  const sortedRatios = items
    .filter((item) => item.ratio != null)
    .sort((a, b) => a.ratio! - b.ratio!);

  return {
    betterRatio: sortedRatios[0]?.ratio ?? null,
    worstRatio: sortedRatios[sortedRatios.length - 1]?.ratio ?? null,
  };
}
