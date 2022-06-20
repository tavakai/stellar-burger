import { AnyAction } from 'redux';
import { constructorReducer, initialState } from "./constructor";
import * as types from '../../actions/constants';

describe('constructor reducer test', () => {
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
    expect(constructorReducer(undefined, {} as AnyAction))
      .toEqual(initialState);
  })
  it('should ADD_INGREDIENT_IN_CONSTRUCTOR', () => {
    expect(constructorReducer(initialState, {
      type: types.ADD_INGREDIENT_IN_CONSTRUCTOR,
      constructorItem: ingredient,
      key: "test key"
    }))
    .toEqual({
      ...initialState,
      ingredientsInConstructor: [
        ...initialState.ingredientsInConstructor,
        {
          ...ingredient,
          key: "test key"
        }
    ]
    })
  })
  it('should DELETE_INGREDIENT_IN_CONSTRUCTOR', () => {
    expect(constructorReducer(initialState, {
      type: types.DELETE_INGREDIENT_IN_CONSTRUCTOR,
      key: "ingredient key"
    }))
    .toEqual({
      ...initialState,
      ingredientsInConstructor: initialState.ingredientsInConstructor.filter(el => el.key !== 'ingredient key')
    })
  })
  it('should MOVE_INGREDIENT_IN_CONSTRUCTOR', () => {
    expect(constructorReducer(initialState, {
      type: types.MOVE_INGREDIENT_IN_CONSTRUCTOR,
      ingredients: [ingredient]
    }))
    .toEqual({
      ...initialState,
      ingredientsInConstructor: [ingredient]
    })
  })
  it('should ADD_BUN', () => {
    expect(constructorReducer(initialState, {
      type: types.ADD_BUN,
      bun: ingredient
    }))
    .toEqual({
      ...initialState,
      buns: { ...ingredient }
    })
  })
  it('should DELETE_BUN', () => {
    expect(constructorReducer(initialState, {
      type: types.DELETE_BUN
    }))
    .toEqual({
      ...initialState,
      buns: null
    })
  })
  it('should CLEAR_CONSTRUCTOR', () => {
    expect(constructorReducer(initialState, {
      type: types.CLEAR_CONSTRUCTOR
    }))
    .toEqual({
      ...initialState,
      buns: null,
      ingredientsInConstructor: []
    })
  })
})