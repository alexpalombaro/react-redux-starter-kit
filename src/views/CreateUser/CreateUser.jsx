import styles from './CreateUser.scss';

import React from 'react';
import {connect} from 'react-redux';

class CreateUserView extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
  };

  render() {
    return (
      <div className='view view--home container'>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(CreateUserView);
