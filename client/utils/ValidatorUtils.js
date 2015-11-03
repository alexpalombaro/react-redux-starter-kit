import {log} from 'utils';

// http://www.regular-expressions.info/email.html
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function validDate(str):Boolean {
  const date = new Date(str);
  return date.toString().toLowerCase() !== 'invalid date';
}

export function validEmail(str):Boolean {
  return EMAIL_REGEX.test(str);
}
