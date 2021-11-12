const initialState = {
    list: [],
    trending: [],
};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_SCROLLS':
            return { ...state, list: action.scrolls };
        case 'LOAD_TRENDING':
            return { ...state, trending: action.trending };
        default:
            return { ...state };
    }
}
