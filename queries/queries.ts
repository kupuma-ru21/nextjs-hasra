import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users(order_by: { created_at: desc }) {
      name
      id
      created_at
    }
  }
`;

export const GET_USERS_LOCAL = gql`
  query GetUsers {
    users(order_by: { created_at: desc }) @client {
      name
      id
      created_at
    }
  }
`;

export const GET_USERIDS = gql`
  query GetUsers {
    users(order_by: { created_at: desc }) {
      id
    }
  }
`;

export const GET_USERBY_ID = gql`
  query GetUsers($id: uuid!) {
    users_by_pk(id: $id) {
      id
      name
      created_at
    }
  }
`;
