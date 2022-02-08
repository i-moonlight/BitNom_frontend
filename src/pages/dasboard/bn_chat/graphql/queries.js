import { gql } from '@apollo/client';

const dialogueSubFields = `
    _id
    initiator {
        unreadCount
        blocked
        info {
            _id {
                _id
                displayName
                profile_pic
                bio
            }
        }
        lastSeen
        pinned
        archived
    }
    recipient {
        unreadCount
        blocked
        info {
            _id {
                _id
                displayName
                profile_pic
                bio
            }
        }
        lastSeen
        pinned
        archived
    }
    currentUser {
        unreadCount
        blocked
        info {
            _id {
                _id
                displayName
                profile_pic
                bio
            }
        }
        lastSeen
        pinned
        archived
    }
    otherUser {
        unreadCount
        blocked
        info {
            _id {
                _id
                displayName
                profile_pic
                bio
            }
        }
        lastSeen
        pinned
        archived
    }
    status
    lastMessage {
        text
        video
        images
        documents
        gif
        date
    }
`;

export const SEARCH_USERS = gql`
    query ($searchString: String!, $limit: Int, $skip: Int) {
        Users {
            search(
                params: {
                    searchString: $searchString
                    limit: $limit
                    skip: $skip
                }
            ) {
                _id
                displayName
                profile_pic
                bio
            }
        }
    }
`;
export const SEARCH_CHATS = gql`
    query ($params: ISearchDialogue) {
        Dialogue {
            search(params: $params) {
                ${dialogueSubFields}
            }
        }
    }
`;
export const SEARCH_MESSAGES = gql`
    query ($data: ISearchChatMessages) {
        Dialogue {
            searchMessages(data: $data) {
                _id
                text
                author {
                    _id
                    displayName
                    profile_pic
                    bio
                }
                images
                video
                gif
                documents
                date
                status
                chat {
                    _id
                }
            }
        }
    }
`;

export const CREATE_DIALOGUE = gql`
    mutation ($data: IUserSmall!) {
        Dialogue {
            create(data: $data) {
                ${dialogueSubFields}
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
        $archived: Boolean
        $pinned: Boolean
    ) {
        Dialogue {
            get(
                params: {
                    status: $status
                    blocked: $blocked
                    sortOrder: $sortOrder
                    sortByField: $sortByField
                    archived: $archived
                    pinned: $pinned
                }
            ) {
                ${dialogueSubFields}
            }
        }
    }
`;

export const ACCEPT_DIALOGUE_INVITE = gql`
    mutation ($_id: ID!) {
        Dialogue {
            accept(_id: $_id) {
                ${dialogueSubFields}
            }
        }
    }
`;

export const REJECT_DIALOGUE_INVITE = gql`
    mutation ($_id: ID!) {
        Dialogue {
            reject(_id: $_id) {
                ${dialogueSubFields}
            }
        }
    }
`;
export const BLOCK_DIALOGUE = gql`
    mutation ($id: ID!) {
        Dialogue {
            block(_id: $id) {
                ${dialogueSubFields}
            }
        }
    }
`;

export const UNBLOCK_DIALOGUE = gql`
    mutation ($_id: ID!) {
        Dialogue {
            unblock(_id: $_id) {
               ${dialogueSubFields}
            }
        }
    }
`;
export const GET_DIALOGUE_MESSAGES = gql`
    query (
        $chat: ID!
        $limit: Int
        $skip: Int
        $sortOrder: String
        $pinned: Boolean
    ) {
        Dialogue {
            getMessages(
                data: {
                    chat: $chat
                    params: {
                        pinned: $pinned
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
                    displayName
                    profile_pic
                    bio
                }
                text
                date
                images
                video
                documents
                gif
                pinned
                edited
                status
                responseTo {
                    _id
                    text
                }
                chat {
                    _id
                }
            }
        }
    }
`;

export const CREATE_DIALOGUE_MESSAGE = gql`
    mutation ($data: ICreateChatMessage) {
        Dialogue {
            createMessage(data: $data) {
                _id
                chat {
                    _id
                }
                author {
                    _id
                    displayName
                    profile_pic
                    bio
                }
                text
                date
                video
                images
                documents
                gif
                edited
                status
                responseTo {
                    _id
                    text
                    author {
                        _id
                        displayName
                        profile_pic
                        bio
                    }
                }
            }
        }
    }
`;
export const CREATE_GROUP = gql`
    mutation ($name: String!, $participants: [String!]!) {
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
                lastMessage {
                    text
                    video
                    images
                    documents
                    gif
                    date
                }
                createdOn
            }
        }
    }
`;

export const GROUP_REMOVE_USER = gql`
    mutation ($user: String!, $group: ID!) {
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
                lastMessage {
                    text
                    video
                    images
                    documents
                    gif
                    date
                }
                createdOn
            }
        }
    }
`;

export const GROUP_ADD_USER = gql`
    mutation ($user: String!, $group: ID!) {
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
                lastMessage {
                    text
                    video
                    images
                    documents
                    gif
                    date
                }
                createdOn
            }
        }
    }
`;

export const GROUP_CREATE_MESSAGE = gql`
    mutation ($chat: ID!, $text: String!, $responseTo: ID) {
        Group {
            createMessage(
                data: { chat: $chat, text: $text, responseTo: $responseTo }
            ) {
                _id
                text
                date
                chat
                author
                responseTo {
                    _id
                    text
                }
            }
        }
    }
`;

export const GET_GROUPS = gql`
    query ($sortByField: String, $sortOrder: String) {
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
                lastMessage {
                    text
                    images
                    video
                    gif
                    documents
                    date
                }
            }
        }
    }
`;

export const GROUP_GET_MESSAGES = gql`
    query ($sortOrder: String, $chat: ID!) {
        Group {
            getMessages(
                data: {
                    chat: $chat
                    params: { sortOrder: $sortOrder, sortByField: "date" }
                }
            ) {
                _id
                chat
                author
                text
                responseTo {
                    _id
                    text
                }
                date
            }
        }
    }
`;
export const ARCHIVE_CHAT = gql`
    mutation ($_id: ID!) {
        Dialogue {
            archive(_id: $_id) {
                ${dialogueSubFields}
            }
        }
    }
`;
export const MARK_CHAT_AS_READ = gql`
    mutation ($_id: ID!) {
        Dialogue {
            archive(_id: $_id) {
                ${dialogueSubFields}
            }
        }
    }
`;
export const MUTE_CONVERSATION = gql`
    mutation ($_id: ID!) {
        Dialogue {
            archive(_id: $_id) {
                ${dialogueSubFields}
            }
        }
    }
`;
export const BLOCK_CHAT = gql`
    mutation ($_id: ID!) {
        Dialogue {
            block(_id: $_id) {
                ${dialogueSubFields}
            }
        }
    }
`;
export const REPORT_USER = gql`
    # TODO:get actual schema
    mutation ($sortOrder: String, $chat: ID!) {
        Group {
            getMessages(
                data: {
                    chat: $chat
                    params: { sortOrder: $sortOrder, sortByField: "date" }
                }
            ) {
                _id
                chat
                author
                text
                edited
                responseTo {
                    _id
                    text
                }
                date
            }
        }
    }
`;
export const NEW_MESSAGE_SUBSCRIPTION = gql`
    subscription ($_id: ID!) {
        newMessage(_id: $_id) {
            _id
            chat {
                _id
            }
            author {
                _id
                displayName
                profile_pic
                bio
            }
            text
            date
            images
            video
            documents
            gif
            edited
            status
            responseTo {
                _id
                text
            }
        }
    }
`;

export const NEW_CHAT_ADDED = gql`
    subscription ($_id: ID!) {
        newChat(_id: $_id) {
            ${dialogueSubFields}
        }
    }
`;
export const USER_IS_ONLINE = gql`
    subscription userIsOnline($_id: ID!) {
        userIsOnline(_id: $_id) {
            _id
            user
            lastSeen
            online
        }
    }
`;
export const USER_ONLINE_STATUS = gql`
    mutation updateLastSeen($_id: ID!) {
        Dialogue {
            updateLastSeen(_id: $_id)
        }
    }
`;
export const CHAT_ACCEPTED = gql`
    subscription chatAccepted($_id: ID!) {
        chatAccepted(_id: $_id) {
            ${dialogueSubFields}
        }
    }
`;
export const LATESTMESSAGE_SUBSCRIPTION = gql`
    subscription lastMessageUpdate($_id: ID!) {
        lastMessageUpdate(_id: $_id) {
            text
            _id
            images
            video
            documents
            gif
            date
        }
    }
`;
export const UNREAD_COUNT = gql`
    subscription UnreadCount($_id: ID!) {
        UnreadCount(_id: $_id) {
            _id
            user
            count
        }
    }
`;
export const PIN_CHAT = gql`
    mutation ($_id: ID!) {
        Dialogue {
            pin(_id: $_id) {
                ${dialogueSubFields}
            }
        }
    }
`;
export const PIN_MESSAGE = gql`
    mutation pinMessage($data: OMessageInput!) {
        Dialogue {
            pinMessage(data: $data) {
                _id
                chat {
                    _id
                }
                author {
                    _id
                    displayName
                    profile_pic
                    bio
                }
                text
                images
                video
            }
        }
    }
`;
export const UNARCHIVE = gql`
    mutation unarchive($_id: ID!) {
        Dialogue {
            unarchive(_id: $_id){
                ${dialogueSubFields}
            }
        }
    }
`;
export const UNPIN = gql`
    mutation unpin($_id: ID!) {
        Dialogue {
            unpin(_id: $_id){
                ${dialogueSubFields}
            }
        }
    }
`;
export const UNPIN_MESSAGE = gql`
    mutation unpinMessage($data: OMessageInput!) {
        Dialogue {
            unpinMessage(data: $data) {
                _id
                chat {
                    _id
                }
                author {
                    _id
                    displayName
                    profile_pic
                    bio
                }
                text
                images
                video
            }
        }
    }
`;
export const UPDATE_MESSAGE = gql`
    mutation updateMessage($data: IUpdateMessage!) {
        Dialogue {
            updateMessage(data: $data) {
                _id
                text
                chat {
                    _id
                }
                author {
                    _id
                    displayName
                    profile_pic
                    bio
                }
                date
                images
                video
                documents
                gif
            }
        }
    }
`;
export const DELETE_MESSAGE = gql`
    mutation deleteMessage($data: OMessageInput!) {
        Dialogue {
            deleteMessage(data: $data)
        }
    }
`;

export const PIN_CHAT_SUB = gql`
    subscription pinChat($_id: ID!) {
        pinChat(_id: $_id) {
            ${dialogueSubFields}
        }
    }
`;
export const ARCHIVE_CHAT_SUB = gql`
    subscription archiveChat($_id: ID!) {
        archiveChat(_id: $_id) {
            ${dialogueSubFields}
        }
    }
`;
export const MESSAGE_UPDATE_SUB = gql`
    subscription messageUpdate($_id: ID!) {
        messageUpdate(_id: $_id) {
            _id
            chat {
                _id
            }
            author {
                _id
                displayName
                profile_pic
                bio
            }
            text
            date
            images
            video
            documents
            gif
            edited
            status
            responseTo {
                _id
                text
                author {
                    _id
                    displayName
                    profile_pic
                    bio
                }
            }
        }
    }
`;
export const TOTAL_COUNT = gql`
    subscription totalCount($_id: String!) {
        totalCount(_id: $_id) {
            _id
            count
        }
    }
`;
export const USER_TYPING_SUBS = gql`
    subscription userTyping($data: IUserTypingSUBS!) {
        userTyping(data: $data) {
            typing
            otherUser
            currentUser
            chat
        }
    }
`;
export const USER_TYPING = gql`
    mutation userTypingStatus($data: IUserTyping!) {
        Dialogue {
            userTypingStatus(data: $data)
        }
    }
`;
export const GET_TOTAL_COUNT = gql`
    query getCount($data: IUserSmall!) {
        Dialogue {
            getCount(data: $data)
        }
    }
`;
export const RESET_UNREAD_COUNT = gql`
    mutation resetUnreadCount($_id: ID!) {
        Dialogue {
            resetUnreadCount(_id: $_id) {
                ${dialogueSubFields}
            }
        }
    }
`;
export const BLOCK_USER_SUBS = gql`
subscription blockingUser($_id:ID!){
  blockingUser(_id:$_id){
    ${dialogueSubFields}
  }
}`;
export const REPORT_DIALOGUE_USER = gql`
    mutation report($data: ICreateReport!) {
        Dialogue {
            report(data: $data)
        }
    }
`;
export const DELETE_MESSAGE_SUBSCRIPTION = gql`
    subscription deleteMessageS($_id: ID!) {
        deleteMessageS(_id: $_id) {
            _id
            message
        }
    }
`;
