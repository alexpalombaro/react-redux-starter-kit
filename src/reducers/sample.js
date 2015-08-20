import { createReducer } from 'utils';

import { UPDATE_MESSAGE, CLEAR_MESSAGE } from 'constants';

const initialState  = {
  message : 'Welcome to the React Redux Starter Kit!'
};

export default createReducer(initialState, {
  [UPDATE_MESSAGE] : (state, payload) => {
    return { ...state, message: payload }
  },
  [CLEAR_MESSAGE]: (state) => {
    return { ...state, message: '' }
  }
});
