import { BankAccount } from './bank-account.model';
import { Profile } from './user.model';
export class BankAccountStatement {
  id: string;
  debit: number;
  credit: number;
  account: BankAccount;
  createdBy: Profile;
  dateCreated: Date;
  lastUpdated: Date;
}
