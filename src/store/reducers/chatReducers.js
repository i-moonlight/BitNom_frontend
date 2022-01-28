const initialState = {
    current_chat: {},
    chats: [],
    invites: [],
    groups: [],
    dialogue_messages: [],
    archived: [],
    unreadCount: null,
    searchData: [],
    pinnedChats: [],
    searchedChats: [],
    pinnedMessages: [],
};

export default function chatReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_CHAT_DIALOGUES': {
            return {
                ...state,
                chats: [
                    ...action.data.filter(
                        (chat) =>
                            (chat.currentUser.archived ||
                                chat.currentUser.pinned) !== true
                    ),
                ],
                unreadCount: action.data.reduce((a, b) => {
                    return a + b.currentUser.unreadCount;
                }, 0),
            };
        }
        case 'UPDATE_DIALOGUE':
            return {
                ...state,
                chats: state.chats.map((chat) =>
                    chat._id === action.data._id ? action.data : chat
                ),
            };
        case 'SET_CURRENT_CHAT':
            return { ...state, current_chat: action.chat };
        case 'SET_CHAT_INVITES':
            return { ...state, invites: [...action.data] };
        case 'RESET_CURRENT_CHAT':
            return { ...state, current_chat: {} };
        case 'SET_CHAT_MESSAGES':
            return { ...state, dialogue_messages: [...action.data] };
        case 'ADD_MESSAGES_TO_CURRENT_CHAT':
            return {
                ...state,
                dialogue_messages: [
                    ...state.dialogue_messages.slice(0, action.data),
                    action.data,
                    ...state.dialogue_messages.slice(action.data),
                ],
            };
        case 'UPDATE_MESSAGE':
            return {
                ...state,
                dialogue_messages: state.dialogue_messages.map((message) =>
                    message._id === action.data._id ? action.data : message
                ),
            };
        case 'ADD_CHAT_TO_INVITES':
            return {
                ...state,
                invites: [
                    ...state.invites.slice(0, action.data),
                    action.data,
                    ...state.invites.slice(action.data),
                ],
            };
        case 'ADD_CHAT_TO_DIALOGUES':
            return {
                ...state,
                chats: [
                    ...state.chats.slice(0, action.data),
                    action.data,
                    ...state.chats.slice(action.data),
                ],
            };
        case 'REMOVE_FROM_INVITES':
            return {
                ...state,
                invites: state.invites.filter(
                    (invite) => invite._id !== action.data._id
                ),
            };
        case 'SET_ARCHIVED_CHATS':
            return {
                ...state,
                archived: [...action.data],
            };

        case 'SET_SEARCH_OUTPUT':
            return {
                ...state,
                searchData: [...action.data],
            };
        case 'CLEAR_SEARCH_OUTPUT':
            return { ...state, searchData: [] };
        case 'REMOVE_FROM_MESSAGES':
            return {
                ...state,
                dialogue_messages: state.dialogue_messages.filter(
                    (message) => message._id !== action.data
                ),
            };
        case 'ADD_PINNED_MESSAGES':
            return {
                ...state,
                pinnedMessages: [...action.data],
            };

        case 'ADD_MESSAGE_TO_PINNED_MESSAGES':
            return {
                ...state,
                pinnedMessages: [
                    ...state.pinnedMessages,
                    action.data,
                    // action.data,
                    // ...state.pinnedMessages.slice(0, action.data),
                ],
            };
        case 'DELETE_PINNED_MESSAGE':
            return {
                ...state,
                pinnedMessages: state.pinnedMessages.filter(
                    (pinned) => pinned._id !== action.data._id
                ),
            };
        case 'CLEAR_PINNED_MESSAGES':
            return {
                ...state,
                pinnedMessages: [],
            };
        case 'PIN_CHAT':
            return {
                ...state,
                pinnedChats: [...action.data],
            };
        case 'ADD_TO_PINNED_CHATS':
            return {
                ...state,
                pinnedChats: [
                    ...state.pinnedChats.slice(0, action.data),
                    action.data,
                    ...state.pinnedChats.slice(action.data),
                ],
            };
        case 'DELETE_PINNED_CHAT':
            return {
                ...state,
                pinnedChats: state.pinnedChats.filter(
                    (pinned) => pinned._id !== action.data._id
                ),
            };

        case 'ADD_TO_ARCHIVED':
            return {
                ...state,
                archived: [
                    ...state.archived.slice(0, action.data),
                    action.data,
                    ...state.archived.slice(action.data),
                ],
            };
        case 'DELETE_ARCHIVED_CHAT':
            return {
                ...state,
                archived: state.archived.filter(
                    (archived) => archived._id !== action.data._id
                ),
            };
        case 'SET_TOTAL_COUNT':
            return {
                ...state,
                unreadCount: action.data,
            };

        case 'RESET_TOTAL_COUNT':
            return {
                ...state,
                unreadCount: null,
            };

        case 'SET_CHAT_SRCH_DATA':
            return {
                ...state,
                searchedChats: [...action.data],
            };
        case 'CLEAR_CHAT_SRCH_DATA':
            return {
                ...state,
                searchedChats: [],
            };
        case 'CLEAR_ALL_CHAT_DATA':
            return {
                ...initialState,
            };
        default:
            return { ...state };
    }
}
