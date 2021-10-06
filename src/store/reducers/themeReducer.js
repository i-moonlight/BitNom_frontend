const initialState = {
    palette: 'light',
};

export default function themeReducer(state = initialState, action) {
    switch (action.type) {
        case 'THEME_CHANGE':
            return { ...state, palette: action.palette };
        default:
            return { ...state };
    }
}
