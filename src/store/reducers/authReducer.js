const initialState = {
    user: {},
    err: null,
    token: null,
    busy: false,
    info: null,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_BUSY':
            return { ...state, busy: action.busy };
        case 'REGISTER_BUSY':
            return { ...state, busy: action.busy };
        case 'RESET_BUSY':
            return { ...state, busy: action.busy };
        case 'PASSWORD_BUSY':
            return { ...state, busy: action.busy, info: null };
        case 'AVATAR_BUSY':
            return { ...state, busy: action.busy, info: null };
        case 'USER_LOGIN':
            return {
                ...state,
                user: action.user,
                justRegistered: false,
                err: null,
            };
        case 'USER_UPDATE':
            return {
                ...state,
                user: action.user,
                err: null,
            };
        case 'USER_LOGIN_TOKEN':
            return {
                ...state,
                token: action.token,
            };
        case 'USER_REGISTER':
            return {
                ...state,
                justRegistered: true,
                err: null,
            };
        case 'USER_VERIFY_SUCCESS':
            return {
                ...state,
                user: {
                    ...state.user,
                    email: {
                        ...state.user.email,
                        verified: true,
                    },
                },
                err: null,
            };
        case 'USER_RESET':
            return {
                ...state,
                err: null,
            };
        case 'USER_PASSWORD':
            return {
                ...state,
                err: null,
                info: action.info,
            };
        case 'USER_AVATAR':
            return {
                ...state,
                err: null,
                avatarInfo: action.info,
                user: action.info.data,
            };
        case 'USER_LOGOUT':
            return {
                ...state,
                err: null,
                user: {},
                token: null,
            };
        case 'USER_LOGIN_ERROR':
            return { ...state, user: {}, err: action.err, token: null };
        case 'USER_REGISTER_ERROR':
            return { ...state, user: {}, err: action.err, token: null };
        case 'USER_RESET_ERROR':
            return { ...state, user: {}, err: action.err, token: null };
        case 'USER_PASSWORD_ERROR':
            return { ...state, err: action.err };
        case 'USER_AVATAR_ERROR':
            return { ...state, err: action.err };
        case 'USER_LOGOUT_ERROR':
            return { ...state, err: action.err };
        default:
            return { ...state };
    }
}
