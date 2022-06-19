import { AnyAction } from 'redux';
import { ingredientReducer, initialState } from ".";
import * as action from '../../actions/constants';

describe('ingredient reducer', () => {
  const ingredient = {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "Краторная булка N-200i",
    price: 1255,
    proteins: 80,
    type: "bun",
    __v: 0,
    _id: "_id",
    id: "id",
    key: "key"
  }
  it('should return initial state', () => {
    expect(ingredientReducer(undefined, {} as AnyAction))
      .toEqual(initialState)
  })
  it('should GET_INGREDIENTS_REQUEST', () => {
    expect(ingredientReducer(initialState, {
      type: action.GET_INGREDIENTS_REQUEST
    }))
    .toEqual({
      ...initialState,
      ingredientsRequest: true
    })
  })
  it('should GET_INGREDIENTS_SUCCESS', () => {
    expect(ingredientReducer(initialState, {
      type: action.GET_INGREDIENTS_SUCCESS,
      ingredients: [ingredient]
    }))
    .toEqual({
      ...initialState,
      ingredientsRequest: false,
      ingredients: [ingredient]
    })
  })
  it('should GET_INGREDIENTS_SUCCESS', () => {
    expect(ingredientReducer(initialState, {
      type: action.GET_INGREDIENTS_SUCCESS,
      ingredients: [ingredient]
    }))
    .toEqual({
      ...initialState,
      ingredientsRequest: false,
      ingredients: [ingredient]
    })
  })
  it('should GET_INGREDIENTS_FAILED', () => {
    expect(ingredientReducer(initialState, {
      type: action.GET_INGREDIENTS_FAILED
    }))
    .toEqual({
      ...initialState,
      ingredientsRequest: false,
      ingredientsFailed: true
    })
  })
  it('should CURRENT_INGREDIENT', () => {
    expect(ingredientReducer(initialState, {
      type: action.CURRENT_INGREDIENT,
      currentIngredient: ingredient
    }))
    .toEqual({
      ...initialState,
      modalContent: ingredient
    })
  })
  it('should SHOW_MODAL', () => {
    expect(ingredientReducer(initialState, {
      type: action.SHOW_MODAL
    }))
    .toEqual({
      ...initialState,
      modal: true
    })
  })
  it('should HIDE_MODAL', () => {
    expect(ingredientReducer(initialState, {
      type: action.HIDE_MODAL
    }))
    .toEqual({
      ...initialState,
      modal: false
    })
  })
})