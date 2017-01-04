import fetch from 'isomorphic-fetch';
import { REQUEST_USER_INFO, RECEIVE_USER_INFO } from '../constants/actionTypes';
import config from '../../server/config';

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
    const url = __SERVER__ ? `http://localhost:${config.port}/api/user` : '/api/user';
    return fetch(url)
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveUserInfo(json));
      })
      .catch((err) => { throw err; });
  };
}
