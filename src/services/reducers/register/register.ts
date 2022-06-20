import { IRegisterState, TRegisterActions } from '../../actions/actionTypes';
import {
  GET_REGISTER_REQUEST,
  GET_REGISTER_FAILED,
  GET_REGISTER_SUCCESS
} from '../../actions/constants';

export const initialState: IRegisterState = {
  registerRequest: false,
  registerFailed: false,
  registerSuccess: false
}

export const registerReducer = (state = initialState, action: TRegisterActions): IRegisterState => {
  switch (action.type) {
    case GET_REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case GET_REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerSuccess: true,
      };
    }
    case GET_REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true
      };
    }
    default: {
      return state;
    }
  }
}