import { GraphqlService } from './graphql.service';
import { Injectable } from '@angular/core';
import { USER_BANK_ACCOUNTS_LIST } from '../constants/graphql/queries';

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
}
