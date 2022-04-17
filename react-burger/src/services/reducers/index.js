import { combineReducers } from 'redux';
import { tabsReducer } from './tabs';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { registerReducer } from './register';
import { authReducer } from './auth';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  CURRENT_INGREDIENT,
  SHOW_MODAL,
  HIDE_MODAL
} from '../actions/actionTypes';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  currentIngredient: null,
  modal: false
}

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredients: action.ingredients
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      };
    }
    case CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.currentIngredient
      }
    }
    case SHOW_MODAL: {
      return {
        ...state,
        modal: true
      };
    }
    case HIDE_MODAL: {
      return {
        ...state,
        modal: false,
        // currentIngredient: null
      };
    }
    default: {
      return state;
    }
  }
}

export const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  tabs: tabsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  register: registerReducer,
  auth: authReducer
});