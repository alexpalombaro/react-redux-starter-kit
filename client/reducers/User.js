import {createReducer} from 'utils';
import {ActionType} from 'actions';

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
// Reducer methods
// -----------------------------------------------------------------------------

function validated(state) {
}


//
// Reducer action mapping
// -----------------------------------------------------------------------------
export default createReducer(initialState, {
  [ActionType.UPDATE_USER]: (prevState, payload) => {
    return {...prevState, ...payload};
  }
})
