import { GraphqlService } from './graphql.service';
import { Injectable } from '@angular/core';
import { USER_BANK_ACCOUNTS_LIST } from '../constants/graphql/queries';
import {
  APPLY_BANK_ACCOUNT,
  APPROVE_BANK_ACCOUNT,
  DEPOSIT_BANK_ACCOUNT,
  WITHDRAW_BANK_ACCOUNT,
} from '../constants/graphql/mutations';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private graphqlService: GraphqlService) {}

  getUserBankAccounts(
    skip: number,
    take: number,
    userId: string,
    search?: string
  ) {
    return this.graphqlService.fetchQuery({
      query: USER_BANK_ACCOUNTS_LIST,
      variables: { skip, take, userId, search },
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  applyBankAccount(bankAccountDetails) {
    return this.graphqlService.postMutation({
      mutation: APPLY_BANK_ACCOUNT,
      variables: { bankAccountDetails },
    });
  }

  approveBankAccount(approval) {
    return this.graphqlService.postMutation({
      mutation: APPROVE_BANK_ACCOUNT,
      variables: { approval },
    });
  }

  depositBankAccount(deposit) {
    return this.graphqlService.postMutation({
      mutation: DEPOSIT_BANK_ACCOUNT,
      variables: { ...deposit },
    });
  }

  withdrawBankAccount(withdraw) {
    return this.graphqlService.postMutation({
      mutation: WITHDRAW_BANK_ACCOUNT,
      variables: { ...withdraw },
    });
  }
}
