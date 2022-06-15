import { TOrder } from './../wsActionTypes';
import { IGetIngredientsRequest, IGetIngredientsSuccess, IGetIngredientsFailed, ICurrentIngredient, IGetOrderRequest, IGetOrderSuccess, IGetOrderFailed, IAddIngredientInConstructor, IDeleteIngredientInConstructor, IMoveIngredientInConstructor, IAddBun, IDeleteBun, IClearConstructor } from './../actionTypes';
import {
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
  CLEAR_CONSTRUCTOR
} from '../constants';
import generateKey from '../../../utils/generateKey';
import { IIngredient } from '../../../utils/types';

// Обработка запросов получения всех ингредиентов
export const getIngredientsRequest = (): IGetIngredientsRequest => ({
  type: GET_INGREDIENTS_REQUEST
});
export const getIngredientsSuccess = (data: Array<IIngredient>): IGetIngredientsSuccess => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients: data
});
export const getIngredientsFailed = (): IGetIngredientsFailed => ({
  type: GET_INGREDIENTS_FAILED
});

// Текущий кликнутый ингредиент
export const currentIngredient = (ingredient: IIngredient | TOrder): ICurrentIngredient => ({
  type: CURRENT_INGREDIENT,
  currentIngredient: ingredient
})

// Обработка запросов создания заказа
export const getOrderRequest = (): IGetOrderRequest => ({
  type: GET_ORDER_REQUEST,
})
export const getOrderSuccess = (orderNumber: number): IGetOrderSuccess => ({
  type: GET_ORDER_SUCCESS,
  orderNumber
})
export const getOrderFailed = (): IGetOrderFailed => ({
  type: GET_ORDER_FAILED
})

// Экшены работы с конструктором ингредиентов
export const addIngredientInConstructor = (constructorItem: IIngredient): IAddIngredientInConstructor => ({
  type: ADD_INGREDIENT_IN_CONSTRUCTOR,
  constructorItem,
  key: generateKey()
})
export const deleteIngredientFromConstructor = (key: string): IDeleteIngredientInConstructor => ({
  type: DELETE_INGREDIENT_IN_CONSTRUCTOR,
  key
})
export const sortIngredientsInConstructor = (sortedArray: Array<IIngredient>): IMoveIngredientInConstructor => ({
  type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
  ingredients: sortedArray
})
export const addBun = (bunObject: IIngredient): IAddBun => ({
  type: ADD_BUN,
  bun: bunObject
})
export const deleteBun = (): IDeleteBun => ({
  type: DELETE_BUN
})
export const clearConstructor = (): IClearConstructor => ({
  type: CLEAR_CONSTRUCTOR
})