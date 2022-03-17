class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this.headers = headers;
  }
  // Получим все ингредиенты
  getIngredients() {
    return fetch(`${this._baseUrl}/ingredients`, {
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  // Создание заказа. Принимаем массив из ингредиентов
  createOrder(details) {
    return fetch(`${this._baseUrl}/orders`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        ingredients: details,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  _getResponseData(response) {
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
