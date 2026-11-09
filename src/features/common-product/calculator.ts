import { parseBrazilianCurrencyInput } from "@/lib/currency";

export function getCommonProductRatio(
  priceInput: string,
  amountInput: string,
): number | null {
  const price = parseBrazilianCurrencyInput(priceInput);
  const amount = Number(amountInput);

  if (isNaN(price) || isNaN(amount) || amount == 0) {
    return null;
  }

  return price / amount;
}
