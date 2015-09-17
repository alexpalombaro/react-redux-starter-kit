import {createReducer} from 'utils';

//
// Reducer state
// -----------------------------------------------------------------------------
const initialState = {
  name: null,
  services: [],
  address: {
    number: null,
    street: null,
    suburb: null,
    postcode: null
  }
};


//
// Reducer action mapping
// -----------------------------------------------------------------------------
export default createReducer(initialState, {
})
