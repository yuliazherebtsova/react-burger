/* eslint-disable @typescript-eslint/no-explicit-any */
import { IIngredientsData } from 'services/types/data';
import { BASE_URL } from './constants';

interface IApi {
  readonly baseUrl: string;
  readonly headers: Headers;
}

export default class Api implements IApi {
  readonly baseUrl: string;

  readonly headers: Headers;

  constructor(baseUrl: string, headers: Headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  /**
   * Проверка ответа сервера на корректность:
   * неуспешные запросы и ответы в fetch все равно резолвят промис,
   * поэтому важно проверять булевское значение res.ok */

  /**
   * @params res - промис полученный от сервера с помощью fetch
   * @returns в случае успешного ответа возвращается json с данными, иначе - отклоненный промис
   */
  // eslint-disable-next-line class-methods-use-this
  private checkResponse(res: Response): Promise<any> {
    if (res.ok) return res.json();
    return Promise.reject(new Error(`Ошибка запроса на сервер: ${res.status}`));
  }

  /**
   * GET запрос данных со списком ингредиентов с сервера */

  /**
   * @returns промис полученный от сервера с помощью fetch
   */
  getIngredients(): Promise<any> {
    return fetch(`${this.baseUrl}/ingredients`, {
      headers: this.headers,
    }).then(this.checkResponse);
  }

  /**
   * POST запрос с данными заказа на сервер */

  /**
   * @returns промис полученный от сервера с помощью fetch
   */
  postOrder(ingredients: IIngredientsData): Promise<any> {
    return fetch(`${this.baseUrl}/orders`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        ingredients,
      }),
    }).then(this.checkResponse);
  }
}

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('Content-Type', 'application/json');

export const api = new Api(BASE_URL, requestHeaders);