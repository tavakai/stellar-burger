import { getCookie } from './getCookie';
import { IUserFetch, IApiProps } from './types';

class Api {
  _baseUrl: string
  headers: HeadersInit
  constructor(props: IApiProps) {
    this._baseUrl = props.baseUrl;
    this.headers = props.headers;
  }
  // Регистрация
  register(data: IUserFetch) {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password
      })
    })
    .then(this._getResponseData);
  };
  // Авторизация
  authorize = (user: IUserFetch) => {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: 'POST',
      headers: this.headers,
      credentials: "same-origin",
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
    .then(this._getResponseData);
  };
  // Восстановление пароля
  forgotPassword = (email: string) => {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'same-origin',
      body: JSON.stringify({
        email
      })
    })
    .then(this._getResponseData);
  }
  // Обновление токена
  refreshToken = (refreshToken: string) => {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'same-origin',
      body: JSON.stringify({
        token: refreshToken
      })
    })
    .then(this._getResponseData);
  }
  // Сброс пароля
  resetPassword = (password: string, token: string) => {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'same-origin',
      body: JSON.stringify({
        password,
        token
      })
    })
    .then(this._getResponseData);
  }
  // Получение пользователя
  getUser(token: string) {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: 'GET',
      headers: {
        ...this.headers,
      authorization: `Bearer ${token}`
      },
      credentials: 'same-origin'
    })
    .then(this._getResponseData);
  };
  // Изменение пользователя
  updateUser(token: string, user: IUserFetch) {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
      authorization: `Bearer ${token}`
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        name: user.name,
        email: user.email
      })
    })
    .then(this._getResponseData);
  };
  // Получим все ингредиенты
  getIngredients() {
    return fetch(`${this._baseUrl}/ingredients`, {
      headers: this.headers,
    })
    .then(this._getResponseData);
  }
  // Создание заказа. Принимаем массив из ингредиентов
  createOrder(details: String[]) {
    return fetch(`${this._baseUrl}/orders`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      method: "POST",
      body: JSON.stringify({
        ingredients: details
      }),
    }).then(this._getResponseData);
  }
  // Получение заказа по id
  getOrderByNumber = (number: string | undefined) => {
    return fetch(`${this._baseUrl}/orders/${number}`, {
      method: "GET",
      headers: this.headers,
    }).then(this._getResponseData);
  };
  //  Выход из системы
  logOut = (refreshToken: string) => {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'same-origin',
      body: JSON.stringify({
        token: refreshToken
      })
    })
    .then(this._getResponseData);
  }
  // Проверка ответа запроса
  _getResponseData(response: Response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
}

const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;