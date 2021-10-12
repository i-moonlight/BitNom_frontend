import { gql } from '@apollo/client';

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

export const CREATE_DIALOGUE = gql`
    mutation ($data: IUserSmall!) {
        Dialogue {
            create(data: $data) {
                _id
                initiator {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic
                        bio
                    }
                    lastSeen
                }
                recipient {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic
                        bio
                    }
                    lastSeen
                }
                status
                lastMessageDate
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
    ) {
        Dialogue {
            get(
                params: {
                    status: $status
                    blocked: $blocked
                    sortOrder: $sortOrder
                    sortByField: $sortByField
                    archived: $archived
                }
            ) {
                _id
                initiator {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    lastSeen
                    archived
                }
                recipient {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    lastSeen
                    archived
                }
                otherUser {
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    unreadCount
                    blocked
                    lastSeen
                    archived
                }

                currentUser {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    lastSeen
                    archived
                }
                status
                lastMessageDate
            }
        }
    }
`;

export const ACCEPT_DIALOGUE_INVITE = gql`
    mutation ($_id: ID!) {
        Dialogue {
            accept(_id: $_id) {
                _id
                initiator {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    lastSeen
                }
                recipient {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    lastSeen
                }
                otherUser {
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    unreadCount
                    blocked
                    lastSeen
                    archived
                }

                currentUser {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    lastSeen
                    archived
                }
                status
                lastMessageDate
            }
        }
    }
`;

export const REJECT_DIALOGUE_INVITE = gql`
    mutation ($_id: ID!) {
        Dialogue {
            reject(_id: $_id)
            _id
            initiator {
                unreadCount
                blocked
                info {
                    _id
                    displayName
                    profile_pic

                    bio
                }
                lastSeen
            }
            recipient {
                unreadCount
                blocked
                info {
                    _id
                    displayName
                    profile_pic

                    bio
                }
                lastSeen
            }
            otherUser {
                info {
                    _id
                    displayName
                    profile_pic

                    bio
                }
                unreadCount
                blocked
                lastSeen
                archived
            }

            currentUser {
                unreadCount
                blocked
                info {
                    _id
                    displayName
                    profile_pic

                    bio
                }
                lastSeen
                archived
            }
            status
            lastMessageDate
        }
    }
`;
export const BLOCK_DIALOGUE = gql`
    mutation ($id: ID!) {
        Dialogue {
            block(_id: $id)
            _id
            initiator {
                unreadCount
                blocked
                info {
                    _id
                    displayName
                    profile_pic

                    bio
                }
                lastSeen
            }
            recipient {
                unreadCount
                blocked
                info {
                    _id
                    displayName
                    profile_pic

                    bio
                }
                lastSeen
            }
            otherUser {
                info {
                    _id
                    displayName
                    profile_pic

                    bio
                }
                unreadCount
                blocked
                lastSeen
                archived
            }

            currentUser {
                unreadCount
                blocked
                info {
                    _id
                    displayName
                    profile_pic

                    bio
                }
                lastSeen
                archived
            }
            status
            lastMessageDate
        }
    }
`;

export const UNBLOCK_DIALOGUE = gql`
    mutation ($id: ID!) {
        Dialogue {
            unblock(_id: $id)
            _id
            initiator {
                unreadCount
                blocked
                info {
                    _id
                    displayName
                    profile_pic

                    bio
                }
                lastSeen
            }
            recipient {
                unreadCount
                blocked
                info {
                    _id
                    displayName
                    profile_pic

                    bio
                }
                lastSeen
            }
            status
            lastMessageDate
        }
    }
`;
export const GET_DIALOGUE_MESSAGES = gql`
    query ($chat: ID!, $limit: Int, $skip: Int, $sortOrder: String) {
        Dialogue {
            getMessages(
                data: {
                    chat: $chat
                    params: {
                        limit: $limit
                        skip: $skip
                        sortOrder: $sortOrder
                        sortByField: "date"
                    }
                }
            ) {
                _id
                author
                text
                date
                images
                video
                documents
                gif
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
                author
                text
                date
                video
                images
                documents
                gif
                responseTo {
                    _id
                    text
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
                lastMessageDate
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
                lastMessageDate
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
                lastMessageDate
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
                lastMessageDate
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
                _id
                initiator {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    lastSeen
                    archived
                }
                recipient {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    lastSeen
                    archived
                }
                otherUser {
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    unreadCount
                    blocked
                    lastSeen
                    archived
                }

                currentUser {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    lastSeen
                    archived
                }
                status
                lastMessageDate
            }
        }
    }
`;
export const MARK_CHAT_AS_READ = gql`
    mutation ($_id: ID!) {
        Dialogue {
            archive(_id: $_id) {
                _id
                initiator {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    lastSeen
                    archived
                }
                recipient {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    lastSeen
                    archived
                }
                otherUser {
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    unreadCount
                    blocked
                    lastSeen
                    archived
                }

                currentUser {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic

                        bio
                    }
                    lastSeen
                    archived
                }
                status
                lastMessageDate
            }
        }
    }
`;
export const MUTE_CONVERSATION = gql`
    mutation ($_id: ID!) {
        Dialogue {
            archive(_id: $_id) {
                _id
                initiator {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic
                        bio
                    }
                    lastSeen
                    archived
                }
                recipient {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic
                        bio
                    }
                    lastSeen
                    archived
                }
                otherUser {
                    info {
                        _id
                        displayName
                        profile_pic
                        bio
                    }
                    unreadCount
                    blocked
                    lastSeen
                    archived
                }

                currentUser {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic
                        bio
                    }
                    lastSeen
                    archived
                }
                status
                lastMessageDate
            }
        }
    }
`;
export const BLOCK_CHAT = gql`
    mutation ($_id: ID!) {
        Dialogue {
            block(_id: $_id) {
                _id
                initiator {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic
                        bio
                    }
                    lastSeen
                    archived
                }
                recipient {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic
                        bio
                    }
                    lastSeen
                    archived
                }
                otherUser {
                    info {
                        _id
                        displayName
                        profile_pic
                        bio
                    }
                    unreadCount
                    blocked
                    lastSeen
                    archived
                }
                currentUser {
                    unreadCount
                    blocked
                    info {
                        _id
                        displayName
                        profile_pic
                        bio
                    }
                    lastSeen
                    archived
                }
                status
                lastMessageDate
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
            author
            text
            date
            images
            video
            documents
            gif
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
            _id
            initiator {
                unreadCount
                blocked
                info {
                    _id
                    displayName
                    profile_pic
                    bio
                }
                lastSeen
            }
            recipient {
                unreadCount
                blocked
                info {
                    _id
                    displayName
                    profile_pic
                    bio
                }
                lastSeen
            }
            otherUser {
                info {
                    _id
                    displayName
                    profile_pic
                    bio
                }
                unreadCount
                blocked
                lastSeen
            }
            status
            currentUser {
                unreadCount
                blocked
                info {
                    _id
                    displayName
                    profile_pic
                    bio
                }
                lastSeen
            }
            lastMessageDate
        }
    }
`;
export const USER_IS_ONLINE = gql`
    subscription ($_id: ID!) {
        userIsOnline(_id: $_id)
    }
`;
export const USER_ONLINE_STATUS = gql`
    mutation ($_id: ID!) {
        Dialogue {
            updateLastSeen(_id: $_id)
        }
    }
`;
export const CHAT_ACCEPTED = gql`
    subscription ($_id: ID!) {
        chatAccepted(_id: $_id) {
            _id
            initiator {
                unreadCount
                blocked
                info {
                    _id
                    displayName
                    profile_pic
                    bio
                }
                lastSeen
            }
            recipient {
                unreadCount
                blocked
                info {
                    _id
                    displayName
                    profile_pic
                    bio
                }
                lastSeen
            }
            otherUser {
                info {
                    _id
                    displayName
                    profile_pic
                    bio
                }
                unreadCount
                blocked
                lastSeen
            }
            status
            currentUser {
                unreadCount
                blocked
                info {
                    _id
                    displayName
                    profile_pic
                    bio
                }
                lastSeen
            }
            lastMessageDate
        }
    }
`;
