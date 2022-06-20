import { IAuthState, TAuthActions, TUserActions } from '../../actions/actionTypes';
import {
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILED,
  UPDATE_USER,
  GET_USER,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  SIGN_OUT
} from '../../actions/constants';

export const initialState: IAuthState = {
  loggedIn: false,

  authRequest: false,
  authFailed: false,
  authSuccess: false,

  currentUser: {
    name: '',
    email: ''
  },

  updateUserRequest: false,
  updateUserSuccess: false,
  updateUserFailed: false
}

export const authReducer = (state = initialState, action: TAuthActions | TUserActions): IAuthState => {
  switch (action.type) {
    case GET_AUTH_REQUEST: {
      return {
        ...state,
        authRequest: true,
      };
    }
    case GET_AUTH_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authSuccess: true,
        loggedIn: true,

        currentUser: {
          ...state.currentUser,
          name: action.user.name,
          email: action.user.email
        }
      };
    }
    case GET_AUTH_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true
      };
    }
    case GET_USER: {
      return {
        ...state,
        loggedIn: true,
        currentUser: {
          ...state.currentUser,
          name: action.user.name,
          email: action.user.email
        }
      };
    }
    case UPDATE_USER: {
      return {
        ...state,

        currentUser: {
          ...state.currentUser,
          name: action.user.name,
          email: action.user.email
        }
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserSuccess: true
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserFailed: true,
        updateUserRequest: false
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        loggedIn: false
      };
    }
    default: {
      return state;
    }
  }
}