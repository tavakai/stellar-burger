import api from '../../utils/api';

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const CURRENT_INGREDIENT = 'CURRENT_INGREDIENT';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const SWITCH_TAB = 'SWITCH_TAB';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    api.getIngredients().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        })
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      }
    })
  }
}

export function createOrder() {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    api.createOrder().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order.number
        })
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        })
      }
    })
  }
}

