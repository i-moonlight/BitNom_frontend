const initialState = {
    postCount: null,
};

export default function postCountReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_POST_COUNT':
            return { ...state, postCount: action.postCount };
        default:
            return { ...state };
    }
}
