import { userOrders } from './../../utils/socket';
import {
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_GET_INFO,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_GET_INFO
} from './constants';

export interface IWSOrdersConnectionStart {
  readonly type: typeof WS_ORDERS_CONNECTION_START;
  payload: string 
}
export interface IWSOrdersConnectionSuccess {
  readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS;
}
export interface IWSOrdersConnectionClosed {
  readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
}
export interface IWSOrdersConnectionError {
  readonly type: typeof WS_ORDERS_CONNECTION_ERROR;
}
export interface IWSOrdersGetInfo {
  readonly type: typeof WS_ORDERS_GET_INFO;
  orders: Array<TOrder>,
  total: number,
  totalToday: number
}
export interface IWSUserConnectionStart {
  readonly type: typeof WS_USER_CONNECTION_START;
  payload: string
}
export interface IWSUserConnectionSuccess {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
}
export interface IWSUserConnectionClosed {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
}
export interface IWSUserConnectionError {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
}
export interface IWSUserGetInfo {
  readonly type: typeof WS_USER_GET_INFO;
  orders: Array<TOrder>
}
export interface IOrdersFeedState {
  orders: TFeedOrders,
  userOrders: TOrder[],
  wsFeedConnectionStart: boolean,
  wsFeedConnectionSuccess: boolean,
  wsFeedConnectionClosed: boolean,
  wsFeedConnectionError: boolean,

  wsUserConnectionStart: boolean,
  wsUserConnectionSuccess: boolean,
  wsUserConnectionClosed: boolean,
  wsUserConnectionError: boolean,
}

export type TWSFeedActions = 
| IWSOrdersConnectionClosed
| IWSOrdersConnectionError
| IWSOrdersConnectionStart
| IWSOrdersConnectionSuccess
| IWSOrdersGetInfo
| IWSUserConnectionStart
| IWSUserConnectionSuccess
| IWSUserConnectionError
| IWSUserConnectionClosed
| IWSUserGetInfo;

export type TWSOrdersActions = {
  wsInit: typeof WS_ORDERS_CONNECTION_START,
  onOpen: typeof WS_ORDERS_CONNECTION_SUCCESS,
  onClose: typeof WS_ORDERS_CONNECTION_CLOSED,
  onError: typeof WS_ORDERS_CONNECTION_ERROR,
  wsGetOrders: typeof WS_ORDERS_GET_INFO
}

export const wsOrdersActions: TWSOrdersActions = {
  wsInit: WS_ORDERS_CONNECTION_START,
  onOpen: WS_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_ORDERS_CONNECTION_CLOSED,
  onError: WS_ORDERS_CONNECTION_ERROR,
  wsGetOrders: WS_ORDERS_GET_INFO
}

export type TWSUserActions = {
  wsInit: typeof WS_USER_CONNECTION_START,
  onOpen: typeof WS_USER_CONNECTION_SUCCESS,
  onClose: typeof WS_USER_CONNECTION_CLOSED,
  onError: typeof WS_USER_CONNECTION_ERROR,
  wsGetOrders: typeof WS_USER_GET_INFO
}

export const wsUserActions: TWSUserActions = {
  wsInit: WS_USER_CONNECTION_START,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onError: WS_USER_CONNECTION_ERROR,
  wsGetOrders: WS_USER_GET_INFO
}

export type TOrder = {
  ingredients: Array<string>,
  _id: string,
  status: string,
  number: number,
  createdAt: string,
  updatedAt: string,
  name: string
}

export type TFeedOrders = {
  orders: Array<TOrder>,
  total: number,
  totalToday: number
}