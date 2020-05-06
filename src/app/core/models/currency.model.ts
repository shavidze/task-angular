import { CurrencyType } from '../enums/currency-type.enum';

export interface Currency {
  currencies: CurrencyType[];
  selected: boolean;
}
