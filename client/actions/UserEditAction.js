import {ActionType} from 'actions';

export default {
  updateUserDetails: (props) => {
    return {
      type: ActionType.UPDATE_USER,
      payload: props
    }
  }
}
