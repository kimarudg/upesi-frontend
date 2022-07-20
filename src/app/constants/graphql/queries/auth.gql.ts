import gql from 'graphql-tag';
import { authFields } from '../fields/auth.fields';

export const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      needPasswordChange
      lastLogin

      lastSeen
      avatarHash
    }
  }
`;

export const GET_LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ${authFields}
    }
  }
`;

export const VERIFY_ACCOUNT = gql`
  query verifyAccount($email: String!, $key: String!) {
    verifyAccount(email: $email, key: $key) {
      ${authFields}
    }
  }
`;
