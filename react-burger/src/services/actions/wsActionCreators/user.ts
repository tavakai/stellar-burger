import {
  IWSUserConnectionStart,
  IWSUserConnectionClosed,
  IWSUserConnectionSuccess,
  IWSUserConnectionError,
  IWSUserGetInfo, 
  TOrder
} from './../wsActionTypes';
import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_GET_INFO } from './../constants';

export const wsUserConnectionStart = (): IWSUserConnectionStart => ({
  type: WS_USER_CONNECTION_START
})
export const wsUserConnectionClosed = (): IWSUserConnectionClosed => ({
  type: WS_USER_CONNECTION_CLOSED
})
export const wsUserConnectionSuccess = (): IWSUserConnectionSuccess => ({
  type: WS_USER_CONNECTION_SUCCESS
})
export const wsUserConnectionError = (): IWSUserConnectionError => ({
  type: WS_USER_CONNECTION_ERROR
})
export const wsUserGetInfo = (orders: Array<TOrder>): IWSUserGetInfo => ({
  type: WS_USER_GET_INFO,
  orders
})