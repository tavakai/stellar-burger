import { AnyAction } from 'redux';
import { authReducer, initialState } from "./auth";
import * as types from '../../actions/constants';

describe('auth reducer test', () => {
  const user = {
    name: 'test',
    email: 'test@mail.ru'
  }
  it('should initial state', () => {
    expect(authReducer(undefined, {} as AnyAction)).toEqual(initialState)
  })
  it('should GET_AUTH_REQUEST', () => {
    expect(authReducer(initialState, {
      type: types.GET_AUTH_REQUEST
    }))
    .toEqual({
      ...initialState,
      authRequest: true
    })
  })
  it('should GET_AUTH_SUCCESS', () => {
    expect(authReducer(initialState, {
      type: types.GET_AUTH_SUCCESS,
      user
    }))
    .toEqual({
      ...initialState,
      authRequest: false,
      authSuccess: true,
      loggedIn: true,
      currentUser: {
        ...initialState.currentUser,
        name: user.name,
        email: user.email
      }
    })
  })
  it('should GET_AUTH_FAILED', () => {
    expect(authReducer(initialState, {
      type: types.GET_AUTH_FAILED,
    }))
    .toEqual({
      ...initialState,
      authRequest: false,
      authFailed: true
    })
  })
  it('should GET_USER', () => {
    expect(authReducer(initialState, {
      type: types.GET_USER,
      user
    }))
    .toEqual({
      ...initialState,
      loggedIn: true,
      currentUser: {
        ...initialState.currentUser,
        name: user.name,
        email: user.email
      }
    })
  })
  it('should UPDATE_USER', () => {
    expect(authReducer(initialState, {
      type: types.UPDATE_USER,
      user
    }))
    .toEqual({
      ...initialState,
      currentUser: {
        ...initialState.currentUser,
        name: user.name,
        email: user.email
      }
    })
  })
  it('should UPDATE_USER_REQUEST', () => {
    expect(authReducer(initialState, {
      type: types.UPDATE_USER_REQUEST,
    }))
    .toEqual({
      ...initialState,
      updateUserRequest: true,
    })
  })
  it('should UPDATE_USER_SUCCESS', () => {
    expect(authReducer(initialState, {
      type: types.UPDATE_USER_SUCCESS,
    }))
    .toEqual({
      ...initialState,
      updateUserRequest: false,
      updateUserSuccess: true
    })
  })
  it('should UPDATE_USER_FAILED', () => {
    expect(authReducer(initialState, {
      type: types.UPDATE_USER_FAILED,
    }))
    .toEqual({
      ...initialState,
      updateUserFailed: true,
      updateUserRequest: false
    })
  })
  it('should SIGN_OUT', () => {
    expect(authReducer(initialState, {
      type: types.SIGN_OUT,
    }))
    .toEqual({
      ...initialState,
      loggedIn: false
    })
  })
})