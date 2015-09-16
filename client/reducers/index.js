import {combineReducers} from 'redux';

//
// Reducer imports
// -----------------------------------------------------------------------------

import user from './User';
import company from './Company';

//
// Reducer composite
// -----------------------------------------------------------------------------

export default combineReducers({
  user,
  company
})
