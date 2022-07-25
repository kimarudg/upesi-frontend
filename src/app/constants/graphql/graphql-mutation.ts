import { BankAccountStatement } from '../models/bank-account-statement.model';
import { BankAccount } from './../models/bank-account.model';
export interface Mutation {
  withdrawAccount: BankAccountStatement;
  depositAccount: BankAccountStatement;
  accountStatement: BankAccountStatement;
  approveBankAccount: BankAccount;
}
