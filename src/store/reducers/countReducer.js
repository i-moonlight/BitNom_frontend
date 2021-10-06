const initialState = {
    count: null,
};

export default function countReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_COUNT':
            return { ...state, count: action.count };
        case 'RESET_COUNT':
            return { ...state, count: null };
        default:
            return { ...state };
    }
}
