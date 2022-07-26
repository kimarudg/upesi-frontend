export class BankAccount {
  id: string;
  name: string;
  reference: string;
  currentBalance: number;
  lastUpdated?: Date;
  approved?: boolean;
  currency?: any;
}
