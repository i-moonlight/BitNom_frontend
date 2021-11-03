const initialState = {
    palette: 'light',
    // window.matchMedia('(prefers-color-scheme: dark)').matches
    //     ? 'dark'
    //     : 'light',
};

export default function themeReducer(state = initialState, action) {
    switch (action.type) {
        case 'THEME_CHANGE':
            return { ...state, palette: action.palette };
        default:
            return { ...state };
    }
}
