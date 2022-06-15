import api from "../../utils/api";
import {
  getRegisterFailed,
  getRegisterSuccess,
  getRegisterRequest
} from './actionCreators/register';
import { AppDispatch, IUser } from "../../utils/types";

export function signUp(user: IUser) {
  return function (dispatch: AppDispatch) {
    dispatch(getRegisterRequest());
    api.register(user)
      .then(res => {
        if (res && res.success) {
          const user = res.user;
          dispatch(getRegisterSuccess())
        } else {
          dispatch(getRegisterFailed())
        }
      })
      .catch(err => {
        dispatch(getRegisterFailed())
        console.log(err)
      })
  }
}