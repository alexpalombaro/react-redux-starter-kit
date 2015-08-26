import {createReducer} from 'utils';

import {actionTypes} from 'constants';

const initialState = {
  message: 'Welcome to the React Redux Starter Kit!',
  inputValue: ''
};

export default createReducer(initialState, {
  [actionTypes.UPDATE_MESSAGE]: (state, payload) => {
    return {...state, ...payload, inputValue: payload.message}
  },
  [actionTypes.UPDATE_MESSAGE_ASYNC]: (state, payload) => {
    return {...state, message: 'TODO!'};
  }
});
