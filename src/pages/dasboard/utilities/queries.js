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
      create(data: $data) {
        _id
        author {
          _id
          image
          displayName
          reputation
          type
        }
        content
        image
        scroll
        response_to {
          _id
          author {
            _id
          }
        }
        content_entities {
          type
          offset
          length
          resource {
            _id
            type
          }
          url
        }
        creation_date
        bookmarks
        reactions {
          likes
          dislikes
          loves
          celebrations
        }
      }
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
  query GetAllScrolls {
    Posts {
      get(data: { limit: 220 }) {
        _id
        images
        video
        author {
          _id
          image
          displayName
          reputation
          type
        }
        comments
        bookmarks
        createdAt
        is_flag
        reactions {
          likes
          dislikes
          loves
          celebrations
        }
        content
        content_entities {
          type
          offset
          length
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

export const GET_SCROLL_BY_ID = gql`
  query GetByID($_id: ID!) {
    Posts {
      getById(_id: $_id) {
        _id
        images
        video
        author {
          _id
          image
          displayName
          reputation
          type
        }
        comments
        bookmarks
        createdAt
        is_flag
        reactions {
          likes
          dislikes
          loves
          celebrations
        }
        content
        content_entities {
          type
          offset
          length
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

export const QUERY_GET_COMMENTS = gql`
  query ($data: IGetComments!) {
    Comments {
      get(data: $data) {
        _id
        content
        author {
          _id
          type
          displayName
          reputation
          image
        }
        creation_date
        image
        reactions {
          celebrations
          likes
          dislikes
          loves
        }
        scroll
        response_to {
          _id
          author {
            _id
          }
        }
      }
    }
  }
`;
