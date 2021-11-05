const initialState = {
    list: [],
    trending: [],
    sth: [],
};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_SCROLLS':
            return { ...state, list: action.data };
        case 'LOAD_TRENDING':
            return { ...state, trending: action.data };
        default:
            return { ...state };
    }
}
