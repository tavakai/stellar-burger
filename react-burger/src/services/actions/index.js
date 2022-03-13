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

export const ADD_INGREDIENT_IN_CONSTRUCTOR = 'ADD_INGREDIENT_IN_CONSTRUCTOR';
export const DELETE_INGREDIENT_IN_CONSTRUCTOR = 'DELETE_INGREDIENT_IN_CONSTRUCTOR';
export const MOVE_INGREDIENT_IN_CONSTRUCTOR = 'MOVE_INGREDIENT_IN_CONSTRUCTOR';
export const ADD_BUN = 'ADD_BUN';
export const DELETE_BUN = 'DELETE_BUN';

export const CHANGE_TOTAL_PRICE = 'CHANGE_TOTAL_PRICE';

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

export function createOrder(ingredients) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    api.createOrder(ingredients).then(res => {
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

