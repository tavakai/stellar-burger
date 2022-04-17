import {
  UPDATE_USER,
  GET_AUTH_FAILED,
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  SIGN_OUT,
  GET_USER,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED
} from '../actionTypes';

export const updateUser = (user) => ({
  type: UPDATE_USER,
  user
});
export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST
});
export const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS
});
export const updateUserFailed = () => ({
  type: UPDATE_USER_FAILED
});
export const getUser = (user) => ({
  type: GET_USER,
  user
});
export const getAuthSuccess = (user) => ({
  type: GET_AUTH_SUCCESS,
  user
});
export const getAuthRequest = () => ({
  type: GET_AUTH_REQUEST
});
export const getAuthFailed = () => ({
  type: GET_AUTH_FAILED
});
export const signOut = () => ({
  type: SIGN_OUT
});