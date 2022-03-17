import {
  SHOW_MODAL,
  HIDE_MODAL,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  CURRENT_INGREDIENT,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  ADD_BUN,
  ADD_INGREDIENT_IN_CONSTRUCTOR,
  DELETE_BUN,
  DELETE_INGREDIENT_IN_CONSTRUCTOR,
  MOVE_INGREDIENT_IN_CONSTRUCTOR,
  SWITCH_TAB,
  CLEAR_CONSTRUCTOR
} from './actionTypes';
import generateKey from '../../utils/generateKey';
import api from '../../utils/api';

// Модальные окна
export const showModal = () => ({
type: SHOW_MODAL
})
export const hideModal = () => ({
type: HIDE_MODAL
})

// Обработка запросов получения всех ингредиентов
export const getIngredientsRequest = () => ({
type: GET_INGREDIENTS_REQUEST
});
export const getIngredientsSuccess = (data) => ({
type: GET_INGREDIENTS_SUCCESS,
ingredients: data
});
export const getIngredientsFailed = () => ({
type: GET_INGREDIENTS_FAILED
});

// Текущий кликнутый ингредиент
export const currentIngredient = (ingredient) => ({
type: CURRENT_INGREDIENT,
currentIngredient: ingredient
})

// Обработка запросов создания заказа
export const getOrderRequest = () => ({
type: GET_ORDER_REQUEST,
})
export const getOrderSuccess = (orderNumber) => ({
type: GET_ORDER_SUCCESS,
orderNumber
})
export const getOrderFailed = () => ({
type: GET_ORDER_FAILED
})

// Экшены работы с конструктором ингредиентов
export const addIngredientInConstructor = (constructorItem) => ({
type: ADD_INGREDIENT_IN_CONSTRUCTOR,
constructorItem,
key: generateKey()
})
export const deleteIngredientFromConstructor = (key) => ({
type: DELETE_INGREDIENT_IN_CONSTRUCTOR,
key
})
export const sortIngredientsInConstructor = (sortedArray) => ({
type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
ingredients: sortedArray
})
export const addBun = (bunObject) => ({
type: ADD_BUN,
bun: bunObject
})
export const deleteBun = () => ({
type: DELETE_BUN
})
export const clearConstructor = () => ({
type: CLEAR_CONSTRUCTOR
})

// Экшен на смену табов
export const switchTab = (tab) => ({
type: SWITCH_TAB,
tab
})

export function getIngredients() {
return function(dispatch) {
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

export function createOrder(ingredients) {
return function(dispatch) {
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

