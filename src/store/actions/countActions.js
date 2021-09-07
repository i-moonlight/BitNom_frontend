export const setCount = (count) => {
  return (dispatch) => {
    dispatch({ type: "SET_COUNT", count });
  };
};
