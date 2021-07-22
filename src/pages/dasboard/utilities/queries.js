// BN Dashboard GraphQL Queries
import { gql } from '@apollo/client';

export const MUTATION_CREATE_POST = gql`
  mutation ($data: ICreatePost!) {
    Posts {
      create(data: $data)
    }
  }
`;

export const MUTATION_CREATE_REACTION = gql`
  mutation ($data: ICreateReaction!) {
    Reactions {
      create(data: $data)
    }
  }
`;

export const MUTATION_CREATE_BOOKMARK = gql`
  mutation ($data: ICreateBookmark!) {
    Bookmarks {
      create(data: $data)
    }
  }
`;

export const MUTATION_CREATE_FLAG = gql`
  mutation ($data: ICreateFlag!) {
    Flags {
      create(data: $data)
    }
  }
`;

export const MUTATION_UPDATE_POST = gql`
  mutation ($data: IUpdatePost!) {
    Posts {
      update(data: $data)
    }
  }
`;

export const MUTATION_DELETE_POST = gql`
  mutation ($_id: ID!) {
    Posts {
      delete(_id: $_id)
    }
  }
`;

export const MUTATION_CREATE_COMMENT = gql`
  mutation ($data: ICreateComment!) {
    Comments {
      create(data: $data)
    }
  }
`;

export const MUTATION_UPDATE_COMMENT = gql`
  mutation ($data: IUpdateComment!) {
    Comments {
      update(data: $data)
    }
  }
`;

export const MUTATION_DELETE_COMMENT = gql`
  mutation ($_id: ID!) {
    Comments {
      delete(_id: $_id)
    }
  }
`;

export const QUERY_LOAD_SCROLLS = gql`
  query {
    Posts {
      get(data: { limit: 220 }) {
        _id
        author {
          _id
          image
          displayName
          type
        }
        comments
        createdAt
        reactions {
          likes
        }
        content
        content_entities {
          type
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
