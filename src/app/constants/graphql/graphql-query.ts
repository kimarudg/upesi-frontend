import { User, BankAccount } from '../models';

export interface Paginated<T> {
  list: T[];
  totalCount: number;
}

export interface Query {
  getUserBankAccounts: Paginated<BankAccount>;
  getUserAccounts: Paginated<BankAccount>;
  login?: User;
}
