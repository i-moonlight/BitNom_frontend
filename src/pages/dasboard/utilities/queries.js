// BN Dashboard GraphQL Queries
import { gql } from '@apollo/client';

// Users
export const QUERY_FETCH_PROFILE = gql`
    query {
        Users {
            profile {
                _id
                displayName
                bio
                profile_pic
                displayName
                type
                reputation
                blocked
                followers {
                    userId {
                        _id
                        profile_pic
                        displayName
                        reputation
                        type
                        bio
                    }
                }
                following {
                    userId {
                        _id
                        profile_pic
                        displayName
                        reputation
                        type
                        bio
                    }
                }
                portfolio
                website
                address
                location
                gender
                cover_pic
                loginType
                lastSeen
                paidUntil
                date
                bnTokens {
                    walletAddress
                    earned
                    received
                }
                socials {
                    social {
                        _id
                        name
                        image
                    }
                    profile
                }
                email {
                    address
                    verified
                }
                work {
                    _id
                    company
                    title
                    start_date
                    end_date
                    current
                    description
                }
                education {
                    _id
                    institution
                    major
                    start_date
                    end_date
                    current
                    description
                }
                honors {
                    _id
                    organization
                    name
                    start_date
                    end_date
                    expires
                    url
                }
                courses {
                    _id
                    name
                    year
                }
                projects {
                    _id
                    name
                    year
                }
                skills {
                    _id
                    name
                }
                languages {
                    _id
                    name
                }
            }
        }
    }
`;

export const QUERY_GET_USERS = gql`
    query ($params: IGetUsers) {
        Users {
            get(params: $params) {
                _id
                displayName
                reputation
                type
                bio
                profile_pic
            }
        }
    }
`;

export const QUERY_SEARCH_USERS = gql`
    query ($params: ISearchUsers) {
        Users {
            search(params: $params) {
                _id
                displayName
                bio
                profile_pic
            }
        }
    }
`;

export const MUTATION_UPDATE_PROFILE = gql`
    mutation ($data: IUpdateUser!) {
        Users {
            update(data: $data) {
                _id
            }
        }
    }
`;

export const MUTATION_FOLLOW_USER = gql`
    mutation ($data: IFollow) {
        Users {
            follow(data: $data)
        }
    }
`;

export const MUTATION_UNFOLLOW_USER = gql`
    mutation ($data: IFollow) {
        Users {
            unFollow(data: $data)
        }
    }
`;

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
    subscription liveUpdates($_id: String) {
        liveUpdates(_id: $_id) {
            count
            id
        }
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

//Events

const eventSubFields = `
_id
        image
        description
        title
        host {
          _id
          displayName
          profile_pic
          bio
        }
        tags
        organizers {
          _id
          displayName
          profile_pic
          bio
        }
        is_flag
        endDate
        startDate
        location {
          type
          lat
          long
          address
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
          mentioned {
            _id
            displayName
          }
        }
        link
        attendees {
          attendee {
            _id
            displayName
            profile_pic
            bio
          }
        }
`;

export const QUERY_LOAD_EVENTS = gql`
  query ($data: IGetEvents) {
    Events {
      get(data: $data) {
        ${eventSubFields}
      }
    }
  }
`;

export const GET_BOOKMARKED_EVENTS = gql`
  query ($data: IGetBookmarked) {
    Events {
      getBookmarked(data: $data) {
         ${eventSubFields}
      }
    }
  }
`;

export const QUERY_EVENT_BY_ID = gql`
  query ($_id: ID!) {
    Events {
      getById(_id: $_id) {
         ${eventSubFields}
      }
    }
  }
`;

export const QUERY_EVENTS_BY_HASHTAG = gql`
  query ($hashtag: String!) {
    Events {
      getByHashtag(hashtag: $hashtag) {
         ${eventSubFields}
      }
    }
  }
`;

export const MUTATION_CREATE_EVENT = gql`
  mutation ($data: ICreateEvent!) {
    Events {
      create(data: $data) {
         ${eventSubFields}
      }
    }
  }
`;

export const MUTATION_UPDATE_EVENT = gql`
  mutation ($data: IUpdateEvent!) {
    Events {
      update(data: $data) {
        ${eventSubFields}
      }
    }
  }
`;

export const MUTATION_DELETE_EVENT = gql`
    mutation ($_id: ID!) {
        Events {
            delete(_id: $_id)
        }
    }
`;

export const MUTATION_INVITE_FRIENDS_TO_EVENT = gql`
    mutation ($data: InviteFriends) {
        Events {
            inviteFriends(data: $data)
        }
    }
`;

export const MUTATION_ATTEND_EVENT = gql`
    mutation ($_id: ID!) {
        Events {
            attendEvent(_id: $_id)
        }
    }
`;

export const MUTATION_REMOVE_EVENT_ATTENDANCE = gql`
    mutation ($_id: ID!) {
        Events {
            removeAttendance(_id: $_id)
        }
    }
`;

// Reactions , Bookmarks , Flags

export const MUTATION_CREATE_REACTION = gql`
    mutation ($data: ICreateReaction!) {
        Reactions {
            create(data: $data) {
                reactedToBy {
                    _id
                    reaction_type
                    user_id {
                        _id
                        displayName
                        profile_pic
                    }
                }
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

export const MUTATION_REMOVE_REACTION = gql`
    mutation ($data: IRemoveReaction!) {
        Reactions {
            delete(data: $data) {
                reactedToBy {
                    _id
                    reaction_type
                    user_id {
                        _id
                        displayName
                        profile_pic
                    }
                }
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

export const MUTATION_CREATE_BOOKMARK = gql`
    mutation ($data: ICreateBookmark!) {
        Bookmarks {
            create(data: $data)
        }
    }
`;

export const MUTATION_REMOVE_BOOKMARK = gql`
    mutation ($data: IRemoveBookmark!) {
        Bookmarks {
            delete(data: $data)
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

//Posts

const postSubFields = `
 _id
        images
        video {
          _id
          path
          thumbnail
        }
        author {
          _id
          profile_pic
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
              profile_pic
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
              mentioned {
                _id
                displayName
              }
            }
            image
            description
            title
            host {
              _id
              displayName
              profile_pic
              bio
            }
            location {
              type
              lat
              long
              address
            }
            link
            attendees {
              attendee {
                _id
                displayName
                profile_pic
                bio
              }
            }
            endDate
            startDate
          }
          type
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
          mentioned {
            _id
            displayName
          }
        }
        reacted_to_by {
          _id
          reaction_type
          user_id {
            _id
            displayName
            profile_pic
          }
        }
  `;

/* export const QUERY_GET_TRENDING = gql`
  query ($data: IGetFeed!) {
    Feed {
      get(data: $data) {
          _id
         data {
           ${postSubFields}
          }
          hasMore
      }
    }
  }
`; */

export const QUERY_GET_FEED = gql`
  query ($data: IGetFeed!) {
    Feed {
      get(data: $data) {
          _id
         data {
           ${postSubFields}
          }
          hasMore
      }
    }
  }
`;

export const QUERY_LOAD_SCROLLS = gql`
  query ($data: IGetPosts) {
    Posts {
      get(data: $data) {
         ${postSubFields}
      }
    }
  }
`;

export const GET_BOOKMARKED_SCROLLS = gql`
  query ($data: IGetBookmarked) {
    Posts {
      getBookmarked(data: $data) {
         ${postSubFields}
      }
    }
  }
`;

export const QUERY_POST_BY_ID = gql`
  query ($_id: ID!) {
    Posts {
      getById(_id: $_id) {
         ${postSubFields}
      }
    }
  }
`;

export const QUERY_POSTS_BY_HASHTAG = gql`
  query ($hashtag: String!) {
    Posts {
      getByHashtag(hashtag: $hashtag) {
         ${postSubFields}
      }
    }
  }
`;

export const MUTATION_CREATE_POST = gql`
    mutation ($data: ICreatePost!) {
        Posts {
            create(data: $data){
               ${postSubFields}
            }
        }
    }
`;

export const MUTATION_UPDATE_POST = gql`
    mutation ($data: IUpdatePost!) {
        Posts {
            update(data: $data){
               ${postSubFields}
            }
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

//Comments

const commentSubFields = `
  _id
  author {
    _id
    profile_pic
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
    mentioned {
      _id
      displayName
    }
  }
  creation_date
  bookmarks
  reacted_to_by {
    _id
    reaction_type
    user_id {
      _id
      displayName
      profile_pic
    }
  }
  reactions {
    likes
    dislikes
    loves
    celebrations
  }`;

export const QUERY_GET_COMMENTS = gql`
  query ($data: IGetComments!) {
    Comments {
      get(data: $data) {
      _id
      data{ ${commentSubFields}}
      hasMore
      }
    }
  }
`;

export const GET_BOOKMARKED_COMMENTS = gql`
  query ($data: IGetBookmarked) {
    Comments {
      getBookmarked(data: $data) {
       ${commentSubFields}
      }
    }
  }
`;

export const MUTATION_CREATE_COMMENT = gql`
  mutation ($data: ICreateComment!) {
    Comments {
      create(data: $data) {
        ${commentSubFields}
      }
    }
  }
`;

export const MUTATION_UPDATE_COMMENT = gql`
    mutation ($data: IUpdateComment!) {
        Comments {
            update(data: $data){
                ${commentSubFields}
            }
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

export const GET_USER_NOTIFICATIONS = gql`
    query ($limit: Int) {
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
                        profile_pic
                        displayName
                    }
                }
                link_to_resource {
                    _id
                    type
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

export const MARK_NOTIFICATION_AS_READ = gql`
    mutation ($data: IMarkAsRead) {
        Notification {
            markAsRead(data: $data)
        }
    }
`;

export const DELETE_NOTIFICATION = gql`
    mutation ($_id: ID!) {
        Notification {
            delete(_id: $_id)
        }
    }
`;
export const MUTATION_MUTE_NOTIFICATIONS = gql`
    mutation ($resource: IResource!) {
        Subscription {
            mute(resource: $resource)
        }
    }
`;

export const MUTATION_UNSUBSCRIBE = gql`
    mutation ($resource: IResource!) {
        Subscription {
            unsubscribe(resource: $resource)
        }
    }
`;
