import { REQUEST_USER_INFO, RECEIVE_USER_INFO } from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  userInfo: null,
};

export default function userInfo(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER_INFO:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_USER_INFO:
      return Object.assign({}, state, {
        isFetching: false,
        userInfo: action.userInfo,
      });
    default:
      return state;
  }
}