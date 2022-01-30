class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this.headers = headers;
  }
  
  getIngredients() {
    return fetch(`${this._baseUrl}/ingredients`, {
        headers: this.headers,
      })
      .then(res => {
        return this._getResponseData(res)
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
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export default api;