import {
  GET_REGISTER_FAILED,
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS
} from '../actionTypes';

export const getRegisterSuccess = () => ({
  type: GET_REGISTER_SUCCESS
});

export const getRegisterRequest = () => ({
  type: GET_REGISTER_REQUEST
});

export const getRegisterFailed = () => ({
  type: GET_REGISTER_FAILED
});