import { RootStateOrAny } from 'react-redux';
import { AppDispatch } from './../../utils/types';
import { WS_USER_CONNECTION_START } from './../actions/constants';
import { Middleware, MiddlewareAPI } from 'redux';
import { WS_ORDERS_CONNECTION_START } from '../actions/constants';
import { TWSOrdersActions, TWSUserActions } from './../actions/wsActionTypes';
import { getCookie } from '../../utils/getCookie';

export const socketMiddleware = (
  wsUrl: string, wsActions: TWSOrdersActions | TWSUserActions
): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootStateOrAny>) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, wsGetOrders } = wsActions;
      if (type === wsInit && type === WS_ORDERS_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}`);
        console.log('init all orders')
      } else if (type === wsInit && type === WS_USER_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}?token=${getCookie("accessToken")}`);
        console.log('init user orders')
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

          dispatch({ type: wsGetOrders, orders: parsedData });
        };
        socket.close = event => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  }) as Middleware;
};