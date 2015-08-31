import {createReducer} from 'utils';
import {actionTypes} from 'globals';

//
// Reducer state
// -----------------------------------------------------------------------------
const initialState = {
  message: 'Welcome to the React Redux Starter Kit!',
  inputValue: ''
};

//
// Reducer methods
// -----------------------------------------------------------------------------

function updateMessage(state, payload) {
  return {...state, ...payload, inputValue: payload.message}
}

function updateMessageAsync(state) {
  return {...state, message: 'TODO!'};
}

//
// Reducer action mapping
// -----------------------------------------------------------------------------
export default createReducer(initialState, {
  [actionTypes.UPDATE_MESSAGE]: updateMessage,
  [actionTypes.UPDATE_MESSAGE_ASYNC]: updateMessageAsync
});
