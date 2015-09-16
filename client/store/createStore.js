import {applyMiddleware, createStore, compose} from 'redux';
import {devTools} from 'redux-devtools';
import reducers from 'reducers';

import {actionDelay} from 'middleware';

const storeWithMiddleWare = applyMiddleware(
  actionDelay
);

var finalStore;

if (__DEBUG__) {
  finalStore = compose(storeWithMiddleWare, devTools())(createStore);
} else {
  finalStore = storeWithMiddleWare(createStore);
}

export default function configureStore(initialState) {
  const store = finalStore(reducers, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
