import { AnyAction } from 'redux';
import { orderReducer, initialState } from './order';
import * as types from '../../actions/constants';

describe('order reducer', () => {
  it('should return initial state', () => {
    expect(orderReducer(initialState, {} as AnyAction))
      .toEqual(initialState)
  })
  it('should GET_ORDER_REQUEST', () => {
    expect(orderReducer(initialState, {
      type: types.GET_ORDER_REQUEST
    }))
      .toEqual({
        ...initialState,
        orderRequest: true
      })
  })
  it('should GET_ORDER_SUCCESS', () => {
    expect(orderReducer(initialState, {
      type: types.GET_ORDER_SUCCESS,
      orderNumber: 111111
    }))
      .toEqual({
        ...initialState,
        orderRequest: false,
        orderSuccess: true,
        orderNumber: 111111
      })
  })
  it('should GET_ORDER_FAILED', () => {
    expect(orderReducer(initialState, {
      type: types.GET_ORDER_FAILED
    }))
      .toEqual({
        ...initialState,
        orderRequest: false,
        orderSuccess: false,
        orderFailed: true
      })
  })
  it('should GET_ORDER_BY_NUMBER', () => {
    const order = {
      ingredients: [
        "60d3463f7034a000269f45e7",
        "60d3463f7034a000269f45e9",
        "60d3463f7034a000269f45e8",
        "60d3463f7034a000269f45ea"
      ],
      _id: "62adaacafa747e001bd5316c",
      status: "done",
      number: 0,
      createdAt: "2021-06-23T14:43:22.587Z",
      updatedAt: "2021-06-23T14:43:22.603Z",
      name: "Альфа-сахаридный астероидный флюоресцентный био-марсианский бургер"
    }
    expect(orderReducer(initialState, {
      type: types.GET_ORDER_BY_NUMBER,
      order
    }))
      .toEqual({
        ...initialState,
        orderByNumber: order
      })
  })
})