import api from "../../utils/api";
import {
  getRegisterFailed,
  getRegisterSuccess,
  getRegisterRequest
} from './actionCreators/register';

export function signUp(user) {
  return function (dispatch) {
    dispatch(getRegisterRequest());
    api.register(user)
      .then(res => {
        if (res && res.success) {
          dispatch(getRegisterSuccess(res.user))
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