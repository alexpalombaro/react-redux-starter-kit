import {createReducer} from 'utils';

import {UPDATE_MESSAGE} from 'constants';

const initialState = {
  message: 'Welcome to the React Redux Starter Kit!',
  inputValue: ''
};

export default createReducer(initialState, {
  [UPDATE_MESSAGE]: (state, payload) => {
    return {...state, ...payload, inputValue: payload.message}
  }
});
