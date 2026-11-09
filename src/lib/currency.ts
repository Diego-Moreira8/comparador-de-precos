const brazilianCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function getDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatBrazilianCurrencyInput(value: string): string {
  const cents = Number.parseInt(getDigits(value), 10) || 0;

  return brazilianCurrencyFormatter.format(cents / 100);
}

export function parseBrazilianCurrencyInput(value: string): number {
  const cents = Number.parseInt(getDigits(value), 10) || 0;

  return cents / 100;
}
