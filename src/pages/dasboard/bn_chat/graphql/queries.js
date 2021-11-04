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
export const SEARCH_CHATS = gql`
    query ($params: ISearchDialogue) {
        Dialogue {
            search(params: $params) {
                _id
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
                author
                images
                video
                gif
                documents
                date
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
                    pinned
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
                    pinned
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
                    pinned
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
                    pinned
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
                    pinned
                }
                status
                lastMessage {
                    text
                    video
                    images
                    documents
                    gif
                }
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
                    pinned
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
                    pinned
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
                    pinned
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
                    pinned
                }
                status
                lastMessage {
                    text
                    video
                    images
                    documents
                    gif
                }
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
                pinned
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
                pinned
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
                pinned
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
                pinned
            }
            status
            lastMessage {
                text
                video
                images
                documents
                gif
            }
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
                pinned
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
                pinned
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
                pinned
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
                pinned
            }
            status
            lastMessage {
                text
                video
                images
                documents
                gif
            }
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
                pinned
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
                pinned
            }
            status
            lastMessage {
                text
                video
                images
                documents
                gif
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
                author
                text
                date
                images
                video
                documents
                gif
                pinned
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
                    author
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
                lastMessage {
                    text
                    images
                    video
                    gif
                    documents
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
                    pinned
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
                    pinned
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
                    pinned
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
                    pinned
                }
                status
                lastMessage {
                    images
                    video
                    documents
                    gif
                    text
                }
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
                    pinned
                }
                status
                lastMessage {
                    text
                    gif
                    images
                    video
                    documents
                }
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
                    pinned
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
                    pinned
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
                    pinned
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
                    pinned
                }
                status
                lastMessage {
                    text
                    video
                    gif
                    documents
                    images
                }
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
                    pinned
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
                    pinned
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
                    pinned
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
                    pinned
                }
                status
                lastMessage {
                    images
                    text
                    video
                    documents
                    gif
                }
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
                pinned
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
                pinned
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
                pinned
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
                pinned
            }
            lastMessage {
                text
                images
                video
                documents
                gif
            }
        }
    }
`;
export const USER_IS_ONLINE = gql`
    subscription ($_id: String!) {
        userIsOnline(_id: $_id) {
            _id
            online
        }
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
                pinned
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
                pinned
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
                pinned
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
                pinned
            }
            lastMessage {
                gif
                text
                video
                documents
                images
            }
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
        }
    }
`;
export const PIN_CHAT = gql`
    mutation ($_id: ID!) {
        Dialogue {
            pin(_id: $_id) {
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
                    pinned
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
                    pinned
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
                    pinned
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
                    pinned
                }
                lastMessage {
                    images
                    video
                    documents
                    gif
                    text
                }
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
                author
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
            unarchive(_id: $_id)
        }
    }
`;
export const UNPIN = gql`
    mutation unpin($_id: ID!) {
        Dialogue {
            unpin(_id: $_id)
        }
    }
`;
export const UNPIN_MESSAGE = gql`
    mutation unpinMessage($_id: ID!) {
        Dialogue {
            unpinMessage(_id: $_id)
        }
    }
`;
export const UPDATE_MESSAGE = gql`
    mutation updateMessage($_id: ID!) {
        Dialogue {
            updateMessage(_id: $_id) {
                _id
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
