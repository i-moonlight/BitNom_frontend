const initialState = {
    user: {},
};

export default function userUpdateReducer(state = initialState, action) {
    switch (action.type) {
        case 'USER_UPDATE':
            return { ...state, user: action.userData };
        default:
            return { ...state };
    }
}
