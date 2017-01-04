import { REQUEST_USER_INFO, RECEIVE_USER_INFO } from '../constants/actionTypes';

export function requestUserInfo() {
  return { type: REQUEST_USER_INFO };
}

export function receiveUserInfo(userInfo) {
  return {
    type: RECEIVE_USER_INFO,
    userInfo,
  };
}

export function fetchUserInfo() {
  return (dispatch) => {
    dispatch(requestUserInfo());
    return fetch('http://localhost:3000/api/user')
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveUserInfo(json));
      })
      .catch((err) => { throw err; });
  };
}
