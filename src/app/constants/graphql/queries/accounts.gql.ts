import gql from 'graphql-tag';

export const USER_BANK_ACCOUNTS_LIST = gql`
  query getUserBankAccounts(
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
        id
        name
        reference
        currentBalance
        lastUpdated
        approved
        currency
      }
    }
  }
`;
