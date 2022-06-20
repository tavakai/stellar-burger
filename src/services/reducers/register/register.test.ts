import { AnyAction } from 'redux';
import { initialState, registerReducer } from "./register";
import * as action from '../../actions/constants';

describe('register reducer', () => {
  it('should return initial state', () => {
    expect(registerReducer(undefined, {} as AnyAction)).toEqual(initialState)
  })
  it('should GET_REGISTER_REQUEST', () => {
    expect(registerReducer(initialState, {
      type: action.GET_REGISTER_REQUEST
    }))
    .toEqual({
      ...initialState,
      registerRequest: true
    })
  })
  it('should GET_REGISTER_SUCCESS', () => {
    expect(registerReducer(initialState, {
      type: action.GET_REGISTER_SUCCESS
    }))
    .toEqual({
      ...initialState,
      registerRequest: false,
      registerSuccess: true
    })
  })
  it('should GET_REGISTER_FAILED', () => {
    expect(registerReducer(initialState, {
      type: action.GET_REGISTER_FAILED
    }))
    .toEqual({
      ...initialState,
      registerRequest: false,
      registerFailed: true
    })
  })
})