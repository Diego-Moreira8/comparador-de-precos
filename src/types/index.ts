export interface Unit {
  name: string;
  abbreviation: string;
}

export interface CommonItem {
  id: string;
  priceInput: string;
  amountInput: string;
  ratio: number | null;
}

export interface ToiletPaper {
  id: string;
  priceInput: string;
  rollCountInput: string;
  rollLengthInput: string;
  totalLength: number | null;
  ratio: number | null;
}
