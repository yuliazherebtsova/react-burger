/* eslint-disable @typescript-eslint/no-explicit-any */
import { IIngredientsData, TUserData } from 'services/types/data';
import { BASE_URL } from './constants';
import { getCookie } from './cookies';

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

  /**
   * POST запрос с данными пользователя на сервер для регистрации */

  /**
   * @returns промис полученный от сервера с помощью fetch
   */
  postRegisterUser(user: TUserData): Promise<any> {
    const { name, email, password } = user;
    return fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: this.headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(this.checkResponse);
  }

  /**
   * POST запрос с данными пользователя на сервер для авторизации */

  /**
   * @returns промис полученный от сервера с помощью fetch
   */
  postLoginUser(user: TUserData): Promise<any> {
    const { email, password } = user;
    return fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: this.headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this.checkResponse);
  }

  /**
   * GET запрос о данных пользователя */

  /**
   * @returns промис полученный от сервера с помощью fetch
   */
  getUserData(): Promise<any> {
    return fetch(`${this.baseUrl}/auth/user`, {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: this.headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }).then(this.checkResponse);
  }

  /**
   * PATCH запрос с обновленными данными пользователя */

  /**
   * @returns промис полученный от сервера с помощью fetch
   */
  patchUserData(user: TUserData): Promise<any> {
    const { name, email } = user;
    return fetch(`${this.baseUrl}/auth/user`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: this.headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this.checkResponse);
  }
  /**
   * POST запрос на восстановление пароля пользователя */

  /**
   * @returns промис полученный от сервера с помощью fetch
   */
  postForgotPassword({ email }: { email: string }): Promise<any> {
    return fetch(`${this.baseUrl}/password-reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: this.headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        email,
      }),
    }).then(this.checkResponse);
  }
  /**
   * POST запрос на обновление пароля пользователя */

  /**
   * @returns промис полученный от сервера с помощью fetch
   */
  postResetPassword(password: string, token: string): Promise<any> {
    return fetch(`${this.baseUrl}/password-reset/reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: this.headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        password,
        token,
      }),
    }).then(this.checkResponse);
  }
}

const requestHeaders: HeadersInit = new Headers();
const accessToken = getCookie('accessToken');
requestHeaders.set('Content-Type', 'application/json');
requestHeaders.set('authorization', `${accessToken}`);

export const api = new Api(BASE_URL, requestHeaders);
