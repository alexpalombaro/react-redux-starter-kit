import {actionTypes} from 'constants';

export function updateMessage(message) {
  return {
    type: actionTypes.UPDATE_MESSAGE,
    payload: {message}
  }
}
