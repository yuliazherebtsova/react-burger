export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

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
    return Promise.reject(`Ошибка запроса на сервер: ${res.status}`);
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
}
