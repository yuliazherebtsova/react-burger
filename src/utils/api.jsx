import { BASE_URL } from './constants';

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // eslint-disable-next-line class-methods-use-this
  _checkResponse(res) {
    /**
     * проверка ответа сервера на корректность:
     * неуспешные запросы и ответы в fetch все равно резолвят промис,
     * поэтому важно проверять булевское значение res.ok */

    /**
     * @params res - промис полученный от сервера с помощью fetch
     * @returns в случае успешного ответа - json с данными, иначе - реджект промиса
     */
    if (res.ok) return res.json();
    return Promise.reject(new Error(`Ошибка запроса на сервер: ${res.status}`));
  }

  getIngredients() {
    /**
     * GET запрос данных со списком ингредиентов с сервера */

    /**
     * @returns промис полученный от сервера с помощью fetch
     */
    return fetch(`${this._baseUrl}/ingredients`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  postOrder(ingredients) {
    /**
     * POST запрос с данными заказа на сервер */

    /**
     * @returns промис полученный от сервера с помощью fetch
     */
    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        ingredients,
      }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
