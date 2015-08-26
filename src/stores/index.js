import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import {devTools} from 'redux-devtools';
import * as reducers from 'reducers';

import {actionDelay} from 'middleware';

var buildStore;

const storeWithMiddleWare = applyMiddleware(
  actionDelay
);

var finalStore;

if (__DEBUG__) {
  finalStore = compose(storeWithMiddleWare, devTools(), createStore);
} else {
  finalStore = storeWithMiddleWare(createStore);
}

export default finalStore(combineReducers(reducers));
