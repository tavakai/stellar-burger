import { wsFeedsReducer } from '../wsFeeds/wsFeeds';
import { combineReducers } from 'redux';
import { tabsReducer } from '../tabs/tabs';
import { constructorReducer } from '../constructor/constructor';
import { orderReducer } from '../order/order';
import { registerReducer } from '../register/register';
import { authReducer } from '../auth/auth';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  CURRENT_INGREDIENT,
  SHOW_MODAL,
  HIDE_MODAL
} from '../../actions/constants';
import { IIngredientsState, TIngredientsActions } from '../../actions/actionTypes';

export const initialState: IIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  modalContent: null,
  modal: false
}

export const ingredientReducer = (state = initialState, action: TIngredientsActions): IIngredientsState => {
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
        modalContent: action.currentIngredient
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
  auth: authReducer,
  feed: wsFeedsReducer
});