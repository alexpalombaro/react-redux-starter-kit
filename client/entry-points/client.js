import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/Root';
import createStore from 'store';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const target = document.getElementById('root');
const store = createStore(window.__INITIAL_STATE__);

const node = <Root routerHistory={createBrowserHistory()} store={store}/>;
ReactDOM.render(node, target);
