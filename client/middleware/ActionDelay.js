
export default function actionDelayMiddleware(store) {
  return next => action => {
    if (action.type === 'EXAMPLE') {
      return setTimeout(() => next(action), action.payload.delay);
    }
    next(action);
  }
}
