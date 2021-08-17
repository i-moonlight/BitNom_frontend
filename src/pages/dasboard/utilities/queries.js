// BN Dashboard GraphQL Queries
import { gql } from '@apollo/client';

export const MUTATION_CREATE_FILE_VIDEO = gql`
  mutation ($data: ISaveVideo!) {
    Video {
      createVideo(data: $data) {
        _id
        width
        height
        path
        thumb
      }
    }
  }
`;
export const NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription {
    emitNew
  }
`;

export const MUTATION_CREATE_FILE_IMAGE = gql`
  mutation ($data: ISaveImage!) {
    Image {
      createImage(data: $data) {
        _id
        width
        height
        path
      }
    }
  }
`;
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
        replies
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

// { limit: 220 }

export const QUERY_LOAD_SCROLLS = gql`
  query ($data: IGetPosts) {
    Posts {
      get(data: $data) {
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
        shared_resource {
          _id {
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
            createdAt
            comments
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
        reacted_to_by {
          _id
          reaction_type
          user_id {
            _id
            displayName
            image
          }
        }
      }
    }
  }
`;

export const GET_USER_NOTIFICATIONS = gql`
  query ($limit: Int!) {
    Notification {
      get(limit: $limit) {
        _id
        content
        tag
        content_entities {
          type
          offset
          length
          resource {
            _id
            type
          }
          url {
            _id
            image
            displayName
          }
        }
        image
        notify_subscribers_to
        date
      }
    }
  }
`;

export const MARK_NOTIFICAION_AS_SEEN = gql`
  mutation ($_id: ID) {
    Notification {
      markAsSeen(_id: $_id)
    }
  }
`;

export const MARK_NOTIFICAION_AS_READ = gql`
  mutation ($_id: ID) {
    Notification {
      markAsRead(_id: $_id)
    }
  }
`;

export const DELETE_NOTIFICAION = gql`
  mutation ($_id: ID!) {
    Notification {
      delete(_id: $_id)
    }
  }
`;

export const MUTATION_UNSUBSCRIBE = gql`
  mutation ($data: IUnsubscribe!) {
    Subscription {
      unsubscribe(data: $data)
    }
  }
`;

export const GET_BOOKMARKED_SCROLLS = gql`
  query ($data: IGetBookmarked) {
    Posts {
      getBookmarked(data: $data) {
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
        shared_resource {
          _id {
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
        reacted_to_by {
          _id
          reaction_type
          user_id {
            _id
            displayName
            image
          }
        }
      }
    }
  }
`;

export const QUERY_GET_SCROLL_BY_ID = gql`
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
        shared_resource {
          _id
        }
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
        reacted_to_by {
          _id
          reaction_type
          user_id {
            _id
            displayName
            image
          }
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
        replies
        creation_date
        image
        reactions {
          celebrations
          likes
          dislikes
          loves
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
        reacted_to_by {
          _id
          reaction_type
          user_id {
            _id
            displayName
            image
          }
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

export const GET_BOOKMARKED_COMMENTS = gql`
  query ($data: IGetBookmarked) {
    Comments {
      getBookmarked(data: $data) {
        _id
        content
        author {
          _id
          type
          displayName
          reputation
          image
        }
        replies
        creation_date
        image
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
        reacted_to_by {
          _id
          reaction_type
          user_id {
            _id
            displayName
            image
          }
        }
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
