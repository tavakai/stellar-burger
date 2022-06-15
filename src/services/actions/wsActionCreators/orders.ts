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
  TFeedOrders
} from './../wsActionTypes';

export const wsOrdersConnectionStart = (payload: string): IWSOrdersConnectionStart => ({
  type: WS_ORDERS_CONNECTION_START,
  payload
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
export const wsOrdersOrdersGetInfo = (orders: TFeedOrders): IWSOrdersGetInfo => ({
  type: WS_ORDERS_GET_INFO,
  orders: orders.orders,
  total: orders.total,
  totalToday: orders.totalToday
})