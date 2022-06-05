import {
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_GET_INFO
} from './../constants';
import {
  IWSOrdersConnectionClosed,
  IWSOrdersConnectionStart,
  IWSOrdersConnectionError,
  IWSOrdersConnectionSuccess,
  IWSOrdersGetInfo,
  TOrder
} from './../wsActionTypes';

export const wsOrdersConnectionStart = (): IWSOrdersConnectionStart => ({
  type: WS_ORDERS_CONNECTION_START
})
export const wsOrdersConnectionSuccess = (): IWSOrdersConnectionSuccess => ({
  type: WS_ORDERS_CONNECTION_SUCCESS
})
export const wsOrdersConnectionClosed = (): IWSOrdersConnectionClosed => ({
  type: WS_ORDERS_CONNECTION_CLOSED
})
export const wsOrdersConnectionError = (): IWSOrdersConnectionError => ({
  type: WS_ORDERS_CONNECTION_ERROR
})
export const wsOrdersOrdersGetInfo = (orders: Array<TOrder>): IWSOrdersGetInfo => ({
  type: WS_ORDERS_GET_INFO,
  orders
})