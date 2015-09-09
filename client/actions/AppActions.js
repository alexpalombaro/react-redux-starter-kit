import {actionTypes} from 'globals';

export function updateMessage(message:string):Object {
  return {
    type: actionTypes.UPDATE_MESSAGE,
    payload: {message}
  }
}

export function updateMessageAsync(message:string, delay:number):Object {
  return {
    type: actionTypes.UPDATE_MESSAGE_ASYNC,
    payload: {
      message,
      delay
    }
  }
}
