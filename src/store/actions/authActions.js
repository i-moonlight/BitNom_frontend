export const login = (userdata, errors) => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'LOGIN_BUSY', busy });
    };

    setBusy(true);

    let err = null;
    dispatch({ type: 'USER_LOGIN_ERROR', err });

    let user = userdata;
    dispatch({ type: 'USER_LOGIN', user });
    setBusy(false);

    err = errors;
    errors && dispatch({ type: 'USER_LOGIN_ERROR', err });
  };
};

export const register = (userdata, errors) => {
  return dispatch => {
    const setBusy = busy => {
      dispatch({ type: 'REGISTER_BUSY', busy });
    };

    setBusy(true);

    let err = null;
    dispatch({ type: 'USER_LOGIN_ERROR', err });

    let user = userdata;
    dispatch({ type: 'USER_REGISTER', user });
    setBusy(false);

    err = errors;
    errors && dispatch({ type: 'USER_REGISTER_ERROR', err });
  };
};

export const signout = () => {
  return dispatch => {
    dispatch({ type: 'USER_LOGOUT' });
  };
};
