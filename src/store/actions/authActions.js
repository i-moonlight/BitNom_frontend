// import axios from "axios";
// import { deviceName, Environment } from "../local/contents";
// const baseUrl = Environment.apiUrl;

export const login = () => {
  return dispatch => {
    // const config = {
    //   headers: {
    //     Accept: 'application/json',
    //   },
    // };

    // const body = {
    //   username,
    //   password,
    //   device_name: deviceName,
    // };

    const setBusy = busy => {
      dispatch({ type: 'LOGIN_BUSY', busy });
    };

    setBusy(true);

    // REMOVE
    let user = { name: 'Mark' };
    dispatch({ type: 'USER_LOGIN', user });
    setBusy(false);
    //REMOVE

    // let err = null;
    // dispatch({ type: 'USER_LOGIN_ERROR', err });

    // axios
    //   .post(`${baseUrl}/login`, body, config)
    //   .then(res => {
    //     let user = res.data.member;
    //     let token = res.data.tokens.access_token;

    //     dispatch({ type: 'USER_LOGIN', user });
    //     dispatch({ type: 'USER_LOGIN_TOKEN', token });
    //     setBusy(false);
    //   })
    //   .catch(error => {
    //     let err = error?.response?.data;
    //     dispatch({ type: 'USER_LOGIN_ERROR', err });
    //     setBusy(false);
    //   });
  };
};

export const signout = () => {
  return dispatch => {
    dispatch({ type: 'USER_LOGOUT' });
  };
};
