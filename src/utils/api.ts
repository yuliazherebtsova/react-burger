/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable-next-line class-methods-use-this */
import { IIngredientsData, TUserData } from 'services/types/data';
import { BASE_URL } from './constants';
import { getCookie, setCookie } from './cookies';

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
  private checkResponse = (res: Response) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

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
      headers: this.headers,
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
      headers: this.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this.checkResponse);
  }

  /**
   * POST запрос с данными пользователя на сервер выхода из системы */

  /**
   * @returns промис полученный от сервера с помощью fetch
   */
  postLogoutUser(): Promise<any> {
    const token = localStorage.getItem('refreshToken');
    return fetch(`${this.baseUrl}/auth/logout`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        token,
      }),
    }).then(this.checkResponse);
  }

  /**
   * GET запрос о данных пользователя */

  /**
   * @returns промис полученный от сервера с помощью fetch
   */
  getUserData(): Promise<any> {
    const accessToken = getCookie('accessToken');
    this.headers.set('authorization', accessToken);
    return fetch(`${this.baseUrl}/auth/user`, {
      headers: this.headers,
    })
      .then(this.checkResponse)
      // eslint-disable-next-line consistent-return
      .catch((err) => {
        if (err.message === 'jwt expired') {
          this.postUpdateToken().then((res) => {
            localStorage.setItem('refreshToken', res.refreshToken);
            setCookie('accessToken', res.accessToken);
            this.headers.set('authorization', res.accessToken);
            fetch(`${this.baseUrl}/auth/user`, {
              headers: this.headers,
            }).then(this.checkResponse);
          });
        } else {
          return Promise.reject(err);
        }
      });
  }

  /**
   * PATCH запрос с обновленными данными пользователя */

  /**
   * @returns промис полученный от сервера с помощью fetch
   */
  patchUserData(user: TUserData): Promise<any> {
    const { name, email, password } = user;

    const accessToken = getCookie('accessToken');
    this.headers.set('authorization', accessToken);

    return fetch(`${this.baseUrl}/auth/user`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name,
        email,
        password,
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
      headers: this.headers,
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
  postResetPassword({
    password,
    token,
  }: {
    password: string;
    token: string;
  }): Promise<any> {
    return fetch(`${this.baseUrl}/password-reset/reset`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password,
        token,
      }),
    }).then(this.checkResponse);
  }

  /**
   * POST запрос на обновление токена в случае его истечения */

  /**
   * @returns промис полученный от сервера с помощью fetch
   */
  postUpdateToken(): Promise<any> {
    const token = localStorage.getItem('refreshToken');
    return fetch(`${this.baseUrl}/auth/token`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        token,
      }),
    }).then(this.checkResponse);
  }
}

const requestHeaders: HeadersInit = new Headers();

requestHeaders.set('Content-Type', 'application/json');

export const api = new Api(BASE_URL, requestHeaders);
