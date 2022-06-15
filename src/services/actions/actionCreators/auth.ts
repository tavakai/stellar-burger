import {
  IUpdateUser,
  IGetAuthFailed,
  IGetAuthRequest,
  IGetAuthSuccess,
  ISignOut,
  IGetUser,
  IUpdateUserRequest,
  IUpdateUserSuccess,
  IUpdateUserFailed
} from '../actionTypes';
import { IUser } from '../../../utils/types';
import { UPDATE_USER, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED, GET_USER, GET_AUTH_SUCCESS, GET_AUTH_REQUEST, GET_AUTH_FAILED, SIGN_OUT } from '../constants';

export const updateUser = (user: IUser): IUpdateUser => ({
  type: UPDATE_USER,
  user
});
export const updateUserRequest = (): IUpdateUserRequest => ({
  type: UPDATE_USER_REQUEST
});
export const updateUserSuccess = (): IUpdateUserSuccess => ({
  type: UPDATE_USER_SUCCESS
});
export const updateUserFailed = (): IUpdateUserFailed => ({
  type: UPDATE_USER_FAILED
});
export const getUser = (user: IUser): IGetUser => ({
  type: GET_USER,
  user
});
export const getAuthSuccess = (user: IUser): IGetAuthSuccess => ({
  type: GET_AUTH_SUCCESS,
  user
});
export const getAuthRequest = (): IGetAuthRequest => ({
  type: GET_AUTH_REQUEST
});
export const getAuthFailed = (): IGetAuthFailed => ({
  type: GET_AUTH_FAILED
});
export const signOut = (): ISignOut => ({
  type: SIGN_OUT
});