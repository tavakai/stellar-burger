import { IOrderState, TOrderActions } from '../../actions/actionTypes';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_BY_NUMBER
} from '../../actions/constants';

export const initialState: IOrderState = {
  orderRequest: false,
  orderFailed: false,
  orderSuccess: false,

  orderByNumber: null,

  orderNumber: null
}

export const orderReducer = (state = initialState, action: TOrderActions): IOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderSuccess: true,
        orderNumber: action.orderNumber
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderSuccess: false,
        orderFailed: true
      };
    }
    case GET_ORDER_BY_NUMBER: {
      return {
        ...state,
        orderByNumber: action.order
      };
    }
    default: {
      return state;
    }
  }
}