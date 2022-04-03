import api from "../../utils/api";
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

function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}
// Авторизация
export function signIn(form) {
  return function (dispatch) {
    dispatch(getAuthRequest());
    api.authorize(form)
      .then(res => {
        if (res && res.success) {
          const accessToken = res.accessToken.split('Bearer ')[1];
          const refreshToken = res.refreshToken;
          setCookie('accessToken', accessToken);
          setCookie('refreshToken', refreshToken);
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
export function getCurrentUser(token) {
  return function (dispatch) {
    api.getUser(token)
      .then(res => {
        console.log('1 getUser')
        if (res && res.success) {
          dispatch(getUser(res.user));
          console.log('1 getUser success')
        }
      })
      .catch(err => {
        api.refreshToken(getCookie('refreshToken'))
          .then(res => {
            console.log('refreshToken')
            if (res && res.success) {
              const accessToken = res.accessToken.split('Bearer ')[1];
              const refreshToken = res.refreshToken;
              setCookie('accessToken', accessToken);
              setCookie('refreshToken', refreshToken);
              api.getUser(accessToken)
                .then(res => {
                  console.log('2 getUser')
                  if (res && res.success) {
                    dispatch(getUser(res.user));
                    console.log('2 getUser success')
                  }
                })
            }
          })
      })
  }
}
// Изменение пользователя
export function updateCurrentUser(token, user) {
  return function(dispatch) {
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
  return function(dispatch) {
    api.logOut(getCookie('refreshToken'))
      .then(res => {
        if (res && res.success) {
          document.cookie = 'refreshToken=; path=/; expires=-1';
          dispatch(signOut());
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}