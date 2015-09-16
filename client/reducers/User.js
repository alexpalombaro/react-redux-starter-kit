import {createReducer} from 'utils';
import {actionTypes} from 'globals';

//
// Reducer state
// -----------------------------------------------------------------------------
const initialState = {
  firstName: null,
  lastName: null,
  email: null,
  dob: null,
  companyId: null,
  createdOn: null
};


//
// Reducer action mapping
// -----------------------------------------------------------------------------
export default createReducer(initialState, {
  [actionTypes.UPDATE_MESSAGE]: (state, payload) => {
    return {...state, firstName: payload.message};
  }
})
