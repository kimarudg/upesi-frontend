import gql from 'graphql-tag';

export const CREATE_USER_BANK_ACCOUNTS = gql`
  mutation createUserBankAccount($bankAccountDetails: BankAccountInput!) {
    createBankAccount(bankAccountDetails: $bankAccountDetails) {
      id
      name
      reference
      currentBalance
      createdBy {
        profile {
          firstName
          lastName
        }
      }
      dateCreated
      owners {
        id
        authorizationType
      }
    }
  }
`;

export const APPLY_BANK_ACCOUNT = gql`
  mutation applyBankAccount($bankAccountDetails: BankAccountInput!) {
    applyForBankAccount(bankAccountDetails: $bankAccountDetails) {
      id
      name
      reference
      currentBalance
      approved
      currency
    }
  }
`;

export const APPROVE_BANK_ACCOUNT = gql`
  mutation approveBankAccount($approval: BankAccountApprovalInput!) {
    approveBankAccount(approval: $approval) {
      id
      name
      reference
      currentBalance
      approved
      currency
    }
  }
`;

export const DEPOSIT_BANK_ACCOUNT = gql`
  mutation deposit($amount: Float!, $bankAccount: String!) {
    depositAccount(amount: $amount, bankAccount: $bankAccount) {
      id
      debit
      credit
      account {
        id
        name
        reference
        currentBalance
        approved
        currency
      }
      createdBy {
        profile {
          firstName
          lastName
        }
      }
      dateCreated
      lastUpdated
    }
  }
`;

export const WITHDRAW_BANK_ACCOUNT = gql`
  mutation withdrawAccount($amount: Float!, $bankAccount: String!) {
    withdrawAccount(amount: $amount, bankAccount: $bankAccount) {
      id
      debit
      credit
      account {
        id
        name
        reference
        currentBalance
        approved
        currency
      }
      createdBy {
        profile {
          firstName
          lastName
        }
      }
      dateCreated
      lastUpdated
    }
  }
`;
