import { IUser } from './../../utils/types';
import api from "../../utils/api";
import { setCookie } from "../../utils/setCookie";
import {
  updateUser,
  getAuthSuccess,
  getAuthRequest,
  getAuthFailed,
  signOut,
  getUser,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailed
} from './actionCreators/auth';
import { getCookie } from '../../utils/getCookie';
import { AppDispatch } from './../../utils/types';

// Авторизация
export function signIn(formValues: IUser) {
  return function (dispatch: AppDispatch) {
    dispatch(getAuthRequest());
    api.authorize(formValues)
      .then(res => {
        if (res && res.success) {
          const accessToken = res.accessToken.split('Bearer ')[1];
          const refreshToken = res.refreshToken;
          setCookie('accessToken', accessToken, null);
          setCookie('refreshToken', refreshToken, null);
          dispatch(getAuthSuccess(res.user))
        } else {
          dispatch(getAuthFailed());
        }
      })
      .catch(err => {
        dispatch(getAuthFailed())
        console.log(err)
      })
  }
};

// Запрос пользователя
export function getCurrentUser(token: string) {
  return function (dispatch: AppDispatch) {
    // dispatch(getAuthRequest());
    api.getUser(token)
      .then(res => {
        console.log('1 getUser')
        if (res && res.success) {
          dispatch(getUser(res.user));
        }
      })
      .catch(err => {
        console.log('rej')
        // setCookie("accessToken", "", { expires: -1, path: '/' });
        // setCookie("refreshToken", "", { expires: -1, path: '/' });
        api.refreshToken(getCookie('refreshToken'))
          .then(res => {
            if (res && res.success) {
              const accessToken = res.accessToken.split('Bearer ')[1];
              const refreshToken = res.refreshToken;
              setCookie('accessToken', accessToken, { path: '/' });
              setCookie('refreshToken', refreshToken, { path: '/' });
              console.log('token updated')
              api.getUser(accessToken)
                .then(res => {
                  if (res && res.success) {
                    dispatch(getUser(res.user));
                  }
                })
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
  }
}
// Изменение пользователя
export function updateCurrentUser(token: string, user: IUser) {
  return function(dispatch: AppDispatch) {
    dispatch(updateUserRequest());
    api.updateUser(token, user)
      .then(res => {
        if(res && res.success) {
          dispatch(updateUser(res.user));
          dispatch(updateUserSuccess());
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(updateUserFailed());
      })
  }
}
// Выход из системы
export function logOut() {
  return function(dispatch: AppDispatch) {
    api.logOut(getCookie('refreshToken'))
      .then(res => {
        if (res && res.success) {
          setCookie("accessToken", "", { expires: -1, path: '/' });
          setCookie("refreshToken", "", { expires: -1, path: '/' });
          // document.cookie = 'accessToken=; path=/; expires=-1';
          // document.cookie = 'refreshToken=; path=/; expires=-1';
          dispatch(signOut());
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}