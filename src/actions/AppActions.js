import { UPDATE_MESSAGE } from 'constants';

export function updateMessage(message) {
  return {
    type: UPDATE_MESSAGE,
    payload: { message }
  }
}
