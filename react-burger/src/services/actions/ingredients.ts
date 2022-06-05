import {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed,
  clearConstructor
} from './actionCreators/ingredients';
import api from '../../utils/api';
import { AppDispatch } from '../../utils/types';

export function getIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsRequest());
    api.getIngredients().then(res => {
      if (res && res.success) {
        dispatch(getIngredientsSuccess(res.data))
      } else {
        dispatch(getIngredientsFailed())
      }
    })
      .catch(err => {
        dispatch(getIngredientsFailed())
        console.log(err)
      })
  }
}

export function createOrder(ingredients: Array<string>) {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderRequest());
    api.createOrder(ingredients).then(res => {
      if (res && res.success) {
        dispatch(getOrderSuccess(res.order.number))
        dispatch(clearConstructor())
      } else {
        dispatch(getOrderFailed())
      }
    })
      .catch(err => {
        dispatch(getOrderFailed())
        console.log(err)
      })
  }
}