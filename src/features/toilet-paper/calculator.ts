import { parseBrazilianCurrencyInput } from "@/lib/currency";

interface ToiletPaperCalculation {
  ratio: number;
  totalLength: number;
}

export function getToiletPaperCalculation(
  priceInput: string,
  rollCountInput: string,
  rollLengthInput: string,
): ToiletPaperCalculation | null {
  const price = parseBrazilianCurrencyInput(priceInput);
  const rollCount = Number(rollCountInput);
  const rollLength = Number(rollLengthInput);

  if (isNaN(price) || isNaN(rollCount) || isNaN(rollLength)) {
    return null;
  }

  const totalLength = rollCount * rollLength;

  if (totalLength === 0) {
    return null;
  }

  return { ratio: price / totalLength, totalLength };
}
