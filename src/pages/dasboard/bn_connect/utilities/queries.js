// B GraphQL Queries
import { gql } from '@apollo/client';

export const MUTATION_CREATE_POST = gql`
  mutation ($data: ICreatePost!) {
    Posts {
      create(data: $data)
    }
  }
`;
