import {
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderSuccess: false,

  orderNumber: null
}

export const orderReducer = (state = initialState, action) => {
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
        orderSucess: false,
        orderFailed: true
      };
    }
    default: {
      return state;
    }
  }
}