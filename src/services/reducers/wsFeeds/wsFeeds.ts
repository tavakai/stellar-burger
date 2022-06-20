import { TWSFeedActions } from '../../actions/wsActionTypes';
import {
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_ORDERS_GET_INFO,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_ERROR,
  WS_USER_GET_INFO
} from '../../actions/constants';
import { IOrdersFeedState } from "../../actions/wsActionTypes";

export const initialState: IOrdersFeedState = {
  orders: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  userOrders: [],
  wsFeedConnectionClosed: false,
  wsFeedConnectionError: false,
  wsFeedConnectionStart: false,
  wsFeedConnectionSuccess: false,

  wsUserConnectionClosed: false,
  wsUserConnectionError: false,
  wsUserConnectionStart: false,
  wsUserConnectionSuccess: false
}

export const wsFeedsReducer = (state = initialState, action: TWSFeedActions): IOrdersFeedState => {
  switch (action.type) {
    case WS_ORDERS_CONNECTION_START: {
      return {
        ...state,
        wsFeedConnectionStart: true
      }
    }
    case WS_ORDERS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsFeedConnectionSuccess: true,
        wsFeedConnectionStart: false
      }
    }
    case WS_ORDERS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsFeedConnectionClosed: true,
        wsFeedConnectionSuccess: false
      }
    }
    case WS_ORDERS_CONNECTION_ERROR: {
      return {
        ...state,
        wsFeedConnectionClosed: true,
        wsFeedConnectionSuccess: false
      }
    }
    case WS_ORDERS_GET_INFO: {
      return {
        ...state,
        orders: {
          ...state.orders,
          orders: action.orders,
          total: action.total,
          totalToday: action.totalToday
        }
      }
    }
    case WS_USER_CONNECTION_START: {
      return {
        ...state,
        wsUserConnectionStart: true
      }
    }
    case WS_USER_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsUserConnectionSuccess: true
      }
    }
    case WS_USER_CONNECTION_CLOSED: {
      return {
        ...state,
        wsUserConnectionClosed: true,
        wsUserConnectionSuccess: false
      }
    }
    case WS_USER_CONNECTION_ERROR: {
      return {
        ...state,
        wsUserConnectionClosed: true,
        wsUserConnectionSuccess: false
      }
    }
    case WS_USER_GET_INFO: {
      return {
        ...state,
        userOrders: action.orders
      }
    }
    default: {
      return state;
    }
  }
}