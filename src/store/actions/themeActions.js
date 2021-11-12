export const changeTheme = (palette) => {
    return (dispatch) => {
        dispatch({ type: 'THEME_CHANGE', palette });
    };
};
