import { AccountStatus } from '../enums/account-status.enum';
import { AccountType } from './../enums/account-type.enum';
import { Currency } from './currency.model';

export interface Account {
  id: number;
  clientNumber: number;
  accountType: AccountType;
  currencies: Currency[];
  accountStatus: AccountStatus;
}
