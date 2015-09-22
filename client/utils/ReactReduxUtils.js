import React from 'react';
import ReactDOM from 'react-dom';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';

export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action = null) => {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action.payload) : state;
  };
}

export function createDevToolsWindow(store) {
  const win = window.open(
    null,
    'redux-devtools', // give it a name so it reuses the same window
    'menubar=no,location=no,resizable=yes,scrollbars=no,status=no'
  );

  // reload in case it's reusing the same window with the old content
  win.location.reload();

  // wait a little bit for it to reload, then render
  setTimeout(() => {
    const div = win.document.createElement('div');
    div.id = 'root';
    win.document.body.appendChild(div);
    ReactDOM.render(
      <DebugPanel top right bottom left>
        <DevTools store={store} monitor={LogMonitor}/>
      </DebugPanel>
      , win.document.getElementById('root'));
  }, 10);

  return win;
}
