const initialState = {
    current_chat: {},
    chats: [],
    invites: [],
    groups: [],
    dialogue_messages: [],
    archived: [],
    unreadCount: null,
};

export default function chatReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_CHAT_DIALOGUES': {
            return {
                ...state,
                chats: [...action.data],
                unreadCount: action.data.reduce((a, b) => {
                    return a + b.currentUser.unreadCount;
                }, 0),
            };
        }
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

        default:
            return { ...state };
    }
}
