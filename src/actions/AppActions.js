import {actionTypes} from 'constants';

export function updateMessage(message) {
  return {
    type: actionTypes.UPDATE_MESSAGE,
    payload: {message}
  }
}

export function updateMessageAsync(message, delay) {
  return {
    type: actionTypes.UPDATE_MESSAGE_ASYNC,
    payload: {
      message,
      delay: (typeof delay === 'string' ? parseInt(delay) : delay)
    }
  }
}
