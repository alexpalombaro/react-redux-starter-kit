import {actionTypes} from 'constants';

export default function actionDelayMiddleware(store) {
  return next => action => {
    if (action.type === actionTypes.UPDATE_MESSAGE_ASYNC) {
      return setTimeout(() => next(action), action.payload.delay);
    }
    next(action);
  }
}
