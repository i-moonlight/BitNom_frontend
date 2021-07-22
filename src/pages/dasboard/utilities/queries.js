// BN Dashboard GraphQL Queries
import { gql } from '@apollo/client';

export const QUERY_LOAD_SCROLLS = gql`
  query {
    Posts {
      get(data: { limit: 220 }) {
        _id
        author {
          image
          displayName
          type
        }
        content
        content_entities {
          resource {
            _id
            type
          }
          url
        }
      }
    }
  }
`;
