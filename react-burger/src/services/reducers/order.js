import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
  } from '../actions/index';
  
  const initialState = {
    orderRequest: false,
    orderFailed: false,

    order: null
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
          order: action.order
        };
      }
      case GET_ORDER_FAILED: {
        return {
          ...state,
          orderRequest: false,
          orderFailed: true
        };
      }
      default: {
        return state;
      }
    }
  }