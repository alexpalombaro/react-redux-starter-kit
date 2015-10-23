import {applyMiddleware, createStore} from 'redux';
import reducers from 'reducers';

import {actionDelay} from 'middleware';

const storeWithMiddleWare = applyMiddleware(
  actionDelay
);

var finalStore = storeWithMiddleWare(createStore);

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
