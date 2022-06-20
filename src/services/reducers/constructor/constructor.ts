import { IConstructorState, TConstructorActions } from '../../actions/actionTypes';
import {
  ADD_INGREDIENT_IN_CONSTRUCTOR,
  DELETE_INGREDIENT_IN_CONSTRUCTOR,
  MOVE_INGREDIENT_IN_CONSTRUCTOR,
  ADD_BUN,
  DELETE_BUN,
  CLEAR_CONSTRUCTOR
} from '../../actions/constants';

export const initialState: IConstructorState = {
  buns: null,
  bunsCount: 2, // всегда две булки
  ingredientsInConstructor: [],

  totalPrice: 0,
}

export const constructorReducer = (state = initialState, action: TConstructorActions): IConstructorState => {
  switch(action.type) {
    case ADD_INGREDIENT_IN_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsInConstructor: [
            ...state.ingredientsInConstructor,
            {
              ...action.constructorItem,
              key: action.key
            }
        ]
      }
    }
    case DELETE_INGREDIENT_IN_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsInConstructor: state.ingredientsInConstructor.filter(el => el.key !== action.key)
      }
    }
    case MOVE_INGREDIENT_IN_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsInConstructor: [
          ...action.ingredients
        ]
      }
    }
    case ADD_BUN: {
      return {
        ...state,
        buns: { ...action.bun }
      }
    }
    case DELETE_BUN: {
      return {
        ...state,
        buns: null
      }
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        buns: null,
        ingredientsInConstructor: []
      }
    }
    default: {
      return state
    }
  }
}