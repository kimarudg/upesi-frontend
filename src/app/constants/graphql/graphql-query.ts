import { User, BankAccount } from '../models';

export interface Paginated<T> {
  list: T[];
  totalCount: number;
}

export interface Query {
  getUserAccounts: Paginated<BankAccount>;
  login?: User;
}
