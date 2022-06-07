import { IGetRegisterSuccess, IGetRegisterRequest, IGetRegisterFailed } from './../actionTypes';
import {
  GET_REGISTER_FAILED,
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS
} from '../constants';

export const getRegisterSuccess = (): IGetRegisterSuccess => ({
  type: GET_REGISTER_SUCCESS
});

export const getRegisterRequest = (): IGetRegisterRequest => ({
  type: GET_REGISTER_REQUEST
});

export const getRegisterFailed = (): IGetRegisterFailed => ({
  type: GET_REGISTER_FAILED
});