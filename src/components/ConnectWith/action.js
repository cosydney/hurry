import { SET_TOKEN, SET_USER_INFO } from "./actionTypes"

export const setToken = (token) => ({
  type: SET_TOKEN,
  token
});

export const setUserInfo = (info) => ({
  type: SET_USER_INFO,
  info
});