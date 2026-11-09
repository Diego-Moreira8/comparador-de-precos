export function getCommonProductRatio(
  priceInput: string,
  amountInput: string,
): number | null {
  const price = Number(priceInput);
  const amount = Number(amountInput);

  if (isNaN(price) || isNaN(amount) || amount == 0) {
    return null;
  }

  return price / amount;
}
