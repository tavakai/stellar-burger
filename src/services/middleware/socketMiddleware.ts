import { WS_ORDERS_GET_INFO, WS_USER_GET_INFO } from './../actions/constants';
import { RootStateOrAny } from 'react-redux';
import { AppDispatch, RootState } from './../../utils/types';
import { Middleware, MiddlewareAPI } from 'redux';
import { TWSOrdersActions, TWSUserActions } from './../actions/wsActionTypes';

export const socketMiddleware = (
  wsActions: TWSOrdersActions | TWSUserActions
): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, wsGetOrders } = wsActions;
      if(type === wsInit) {
        socket = new WebSocket(`${payload}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: wsGetOrders, orders: parsedData.orders, total: parsedData.total, totalToday: parsedData.totalToday });
        };
        socket.close = event => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  }) as Middleware;
};