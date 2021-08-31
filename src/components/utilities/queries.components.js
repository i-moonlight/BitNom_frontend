import { gql } from '@apollo/client';

export const QUERY_GET_USER_NOTIFICATIONS = gql`
  query {
    Notification {
      get(limit: 5) {
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
        to_notify {
          _id
          user_id
          read
          seen
        }
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
