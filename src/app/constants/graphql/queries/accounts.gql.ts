import gql from 'graphql-tag';

export const USER_BANK_ACCOUNTS_LIST = gql`
  query getBankUserAccounts(
    $skip: Int!
    $take: Int!
    $userId: String!
    $search: String
  ) {
    getUserBankAccounts(
      skip: $skip
      take: $take
      userId: $userId
      search: $search
    ) {
      list {
        name
        reference
        currentBalance
        lastUpdated
      }
    }
  }
`;
