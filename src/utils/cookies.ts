/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */

// Вспомогательные функции работы с куки (реализация взята из тренажера)

// Доступ к данным в куки по имени
export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * Сохранение данных в куку
 * Эта функция нормализует работу с временем жизни куки и обрабатывает те случаи,
 * когда время жизни куки не было передано.
 */
export function setCookie(
  name: string,
  value: string | number | boolean,
  props: {
    [name: string]: Date | number | string | boolean;
  }
): void {
  props = props || {};
  let exp = props.expires;
  if (typeof exp === 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp instanceof Date) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = `${name}=${value}`;
  for (const propName in props) {
    updatedCookie += `; ${propName}`;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }
  document.cookie = updatedCookie;
}

// Удаление данных из куки по имени
export function deleteCookie(name: string): void {
  setCookie(name, '', { expires: -1 });
}
