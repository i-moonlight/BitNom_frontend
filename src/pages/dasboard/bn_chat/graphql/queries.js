import { gql } from "@apollo/client";

export const SEARCH_USERS = gql`
  query ($searchString: String!, $limit: Int, $skip: Int) {
    Users {
      search(
        params: { searchString: $searchString, limit: $limit, skip: $skip }
      ) {
        _id
        displayName
        image
        reputation
      }
    }
  }
`;

export const CREATE_DIALOGUE = gql`
  mutation ($id: ID!) {
    Chat {
      Dialogue {
        create(_id: $id) {
          _id
          initiator {
            unreadCount
            blocked
            info {
              _id
              image
            }
          }
          recipient {
            unreadCount
            blocked
            info {
              _id
              image
            }
          }
          otherUser {
            info {
              displayName
              _id
              image
            }
            unreadCount
            blocked
          }
          status
          currentUser {
            unreadCount
            blocked
            info {
              _id
              image
            }
          }
          lastMessageDate
        }
      }
    }
  }
`;

export const GET_DIALOGUES = gql`
  query (
    $status: String
    $blocked: Boolean
    $sortOrder: String
    $sortByField: String
  ) {
    Chat {
      Dialogue {
        get(
          params: {
            status: $status
            blocked: $blocked
            sortOrder: $sortOrder
            sortByField: $sortByField
          }
        ) {
          _id
          initiator {
            unreadCount
            blocked
            info {
              _id
              image
            }
          }
          recipient {
            unreadCount
            blocked
            info {
              _id
              image
            }
          }
          otherUser {
            info {
              displayName
              _id
              image
            }
            unreadCount
            blocked
          }
          status
          currentUser {
            unreadCount
            blocked
            info {
              _id
              image
            }
          }
          lastMessageDate
        }
      }
    }
  }
`;

export const ACCEPT_DIALOGUE_INVITE = gql`
  mutation ($id: ID!) {
    Chat {
      Dialogue {
        accept(_id: $id)
      }
    }
  }
`;

export const REJECT_DIALOGUE_INVITE = gql`
  mutation ($id: ID!) {
    Chat {
      Dialogue {
        reject(_id: $id)
      }
    }
  }
`;
export const BLOCK_DIALOGUE = gql`
  mutation ($id: ID!) {
    Chat {
      Dialogue {
        block(_id: $id)
      }
    }
  }
`;

export const UNBLOCK_DIALOGUE = gql`
  mutation ($id: ID!) {
    Chat {
      Dialogue {
        unblock(_id: $id)
      }
    }
  }
`;
export const GET_DIALOGUE_MESSAGES = gql`
  query ($chat_id: ID!, $limit: Int, $skip: Int, $sortOrder: String) {
    Chat {
      Dialogue {
        getMessages(
          data: {
            chat: $chat_id
            params: {
              limit: $limit
              skip: $skip
              sortOrder: $sortOrder
              sortByField: "date"
            }
          }
        ) {
          _id
          author {
            _id
            image
          }
          text
          date
          responseTo {
            _id
            text
          }
          chat
        }
      }
    }
  }
`;

export const CREATE_DIALOGUE_MESSAGE = gql`
  mutation ($chat_id: ID!, $text: String!, $replyTo: ID) {
    Chat {
      Dialogue {
        createMessage(
          data: { chat: $chat_id, text: $text, responseTo: $replyTo }
        ) {
          _id
          chat
          author {
            _id
            image
          }
          text
          date
          responseTo {
            _id
            text
          }
        }
      }
    }
  }
`;
export const CREATE_GROUP = gql`
  mutation ($name: String!, $participants: [String!]!) {
    Chat {
      Group {
        create(data: { name: $name, participants: $participants }) {
          _id
          name
          participants {
            info {
              _id
              image
            }
            isAdmin
            unreadCount
          }
          lastMessageDate
          createdOn
        }
      }
    }
  }
`;

export const GROUP_REMOVE_USER = gql`
  mutation ($user: String!, $group: ID!) {
    Chat {
      Group {
        removeUser(data: { group: $group, user: $user }) {
          _id
          name
          participants {
            info {
              _id
              image
            }
            isAdmin
            unreadCount
          }
          lastMessageDate
          createdOn
        }
      }
    }
  }
`;

export const GROUP_ADD_USER = gql`
  mutation ($user: String!, $group: ID!) {
    Chat {
      Group {
        addUser(data: { group: $group, user: $user }) {
          _id
          name
          participants {
            info {
              _id
              image
            }
            isAdmin
            unreadCount
          }
          lastMessageDate
          createdOn
        }
      }
    }
  }
`;

export const GROUP_CREATE_MESSAGE = gql`
  mutation ($chat: ID!, $text: String!, $responseTo: ID) {
    Chat {
      Group {
        createMessage(
          data: { chat: $chat, text: $text, responseTo: $responseTo }
        ) {
          _id
          text
          date
          chat
          author {
            _id
            image
          }
          responseTo {
            _id
            text
          }
        }
      }
    }
  }
`;

export const GET_GROUPS = gql`
  query ($sortByField: String, $sortOrder: String) {
    Chat {
      Group {
        get(params: { sortByField: $sortByField, sortOrder: $sortOrder }) {
          _id
          name
          participants {
            info {
              _id
              image
            }
            unreadCount
            isAdmin
          }
          lastMessageDate
        }
      }
    }
  }
`;

export const GROUP_GET_MESSAGES = gql`
  query ($sortOrder: String, $chat: ID!) {
    Chat {
      Group {
        getMessages(
          data: {
            chat: $chat
            params: { sortOrder: $sortOrder, sortByField: "date" }
          }
        ) {
          _id
          chat
          author {
            image
            _id
          }
          text
          responseTo {
            _id
            text
          }
          date
        }
      }
    }
  }
`;
