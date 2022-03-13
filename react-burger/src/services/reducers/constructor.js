import {
    ADD_INGREDIENT_IN_CONSTRUCTOR,
    DELETE_INGREDIENT_IN_CONSTRUCTOR,
    MOVE_INGREDIENT_IN_CONSTRUCTOR,
    ADD_BUN,
    DELETE_BUN
} from "../actions";

const initialState = {
  buns: null,
  bunsCount: 2, // всегда две булки
  ingredientsInConstructor: [],

  totalPrice: 0,
}

export const constructorReducer = (state = initialState, action) => {
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
    default: {
      return state
    }
  }
}