import { AnyAction } from 'redux';
import { initialState, wsFeedsReducer } from "./wsFeeds";
import * as action from '../../actions/constants'

describe('Websocket feeds reducer', () => {
  const order = {
    ingredients: ['ingredients id'],
    _id: 'order id',
    status: 'done',
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
    name: "Альфа-сахаридный астероидный флюоресцентный био-марсианский бургер"
  }
  it('should return inital state', () => {
    expect(wsFeedsReducer(undefined, {} as AnyAction))
      .toEqual(initialState)
  })
  it('should WS_ORDERS_CONNECTION_START', () => {
    expect(wsFeedsReducer(initialState, {
      type: action.WS_ORDERS_CONNECTION_START,
      payload: 'payload'
    }))
      .toEqual({
        ...initialState,
        wsFeedConnectionStart: true
      })
  })
  it('should WS_ORDERS_CONNECTION_SUCCESS', () => {
    expect(wsFeedsReducer(initialState, {
      type: action.WS_ORDERS_CONNECTION_SUCCESS,
    }))
      .toEqual({
        ...initialState,
        wsFeedConnectionSuccess: true,
        wsFeedConnectionStart: false
      })
  })
  it('should WS_ORDERS_CONNECTION_CLOSED', () => {
    expect(wsFeedsReducer(initialState, {
      type: action.WS_ORDERS_CONNECTION_CLOSED,
    }))
      .toEqual({
        ...initialState,
        wsFeedConnectionClosed: true,
        wsFeedConnectionSuccess: false
      })
  })
  it('should WS_ORDERS_CONNECTION_ERROR', () => {
    expect(wsFeedsReducer(initialState, {
      type: action.WS_ORDERS_CONNECTION_ERROR,
    }))
      .toEqual({
        ...initialState,
        wsFeedConnectionClosed: true,
        wsFeedConnectionSuccess: false
      })
  })
  it('should WS_ORDERS_GET_INFO', () => {
    expect(wsFeedsReducer(initialState, {
      type: action.WS_ORDERS_GET_INFO,
      orders: [order],
      total: 0,
      totalToday: 0
    }))
      .toEqual({
        ...initialState,
        orders: {
          ...initialState.orders,
          orders: [order],
          total: 0,
          totalToday: 0
        }
      })
  })
  it('should WS_USER_CONNECTION_START', () => {
    expect(wsFeedsReducer(initialState, {
      type: action.WS_USER_CONNECTION_START,
      payload: 'payload'
    }))
      .toEqual({
        ...initialState,
        wsUserConnectionStart: true
      })
  })
  it('should WS_USER_CONNECTION_SUCCESS', () => {
    expect(wsFeedsReducer(initialState, {
      type: action.WS_USER_CONNECTION_SUCCESS,
    }))
      .toEqual({
        ...initialState,
        wsUserConnectionSuccess: true
      })
  })
  it('should WS_USER_CONNECTION_CLOSED', () => {
    expect(wsFeedsReducer(initialState, {
      type: action.WS_USER_CONNECTION_CLOSED,
    }))
      .toEqual({
        ...initialState,
        wsUserConnectionClosed: true,
        wsUserConnectionSuccess: false
      })
  })
  it('should WS_USER_CONNECTION_ERROR', () => {
    expect(wsFeedsReducer(initialState, {
      type: action.WS_USER_CONNECTION_ERROR,
    }))
      .toEqual({
        ...initialState,
        wsUserConnectionClosed: true,
        wsUserConnectionSuccess: false
      })
  })
  it('should WS_USER_GET_INFO', () => {
    expect(wsFeedsReducer(initialState, {
      type: action.WS_USER_GET_INFO,
      orders: [order]
    }))
      .toEqual({
        ...initialState,
        userOrders: [order]
      })
  })
})