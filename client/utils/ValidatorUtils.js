import {log} from 'utils';

export function validDate(str):Boolean {
  const date = new Date(str);
  return date.toString().toLowerCase() !== 'invalid date';
}

export function validEmail(str):Boolean {
  log(str);
  return true;
}
