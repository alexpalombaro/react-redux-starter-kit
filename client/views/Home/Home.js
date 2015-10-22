import styles from './Home.scss';

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';

import {UserEditAction} from 'actions';

//
// Component
// -----------------------------------------------------------------------------
class HomeView extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    sample: React.PropTypes.shape({
      message: React.PropTypes.string.isRequired,
      inputValue: React.PropTypes.string.isRequired
    })
  };

  //
  // Event handlers
  // -----------------------------------------------------------------------------

  clearMessage = () => {
  };

  updateInputTextHandler = (e) => {
    this.props.updateUserDetails({
      firstName: e.target.value
    })
  };

  updateAsyncMessage = () => {
    //var select = this.refs.asyncDelaySelect;
    //this.props.dispatch(updateMessageAsync('Updated message', select.value));
  };

  //
  // Render
  // -----------------------------------------------------------------------------
  render() {
    return (
      <div>
        <h1 className={styles.private}>{this.props.firstName}</h1>
        <input type='text' value={this.props.firstName}
               onChange={this.updateInputTextHandler}/>
        <select ref='asyncDelaySelect'>
          <option value='1000'>1 second</option>
          <option value='1500'>1.5 seconds</option>
          <option value='2000'>2 seconds</option>
        </select>
        <button onClick={this.clearMessage}>Clear Message</button>
        <button onClick={this.updateAsyncMessage}>Update Async</button>
        <div>
          <p>This should be text in Roboto font</p>

          <p>Click this <Link to='/edit'>link</Link> to go to the edit user page.</p>
        </div>
      </div>
    );
  }
}

//
// Redux
// -----------------------------------------------------------------------------

function mapStateToProps(state) {
  return {
    firstName: state.user.firstName
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserDetails: bindActionCreators(UserEditAction.updateUserDetails, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
