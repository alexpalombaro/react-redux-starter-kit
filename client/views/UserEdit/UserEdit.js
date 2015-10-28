import {style} from './UserEdit.scss';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {UserEditAction} from 'actions';

import {ProgressBarView, InputDateView} from 'views';
import {log, Modernizr} from 'utils';

//
// Component
// -----------------------------------------------------------------------------
class UserEditView extends React.Component {

  constructor(props) {
    super(props);
  }


  static propTypes = {
    firstName: React.PropTypes.string.isRequired,
    lastName: React.PropTypes.string.isRequired,
    dob: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired
  };

  //
  // Class methods
  // -----------------------------------------------------------------------------

  getProgress = () => {
    const props = ['firstName', 'lastName', 'dob'];
    const done = props.filter((prop) => {
      return this.props[prop].length > 0;
    });

    return (done.length / props.length) * 100;
  };

  //
  // Event handlers
  // -----------------------------------------------------------------------------

  inputFieldChangeHandler = () => {
    this.props.updateUserDetails({
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value
    });
  };

  dateChangeHandler = (value) => {
    this.props.updateUserDetails({
      dob: value
    })
  };

  //
  // Render
  // -----------------------------------------------------------------------------

  render() {
    return (
      <div className={style}>
        <form className="input-group" autoComplete="on">
          <label htmlFor="firstName" className={Modernizr('input', 'placeholder') ? 'sr-only' : ''}>First Name:</label>
          <input type="text" placeholder="First Name" id="firstName" ref="firstName"
                 value={this.props.firstName} onChange={this.inputFieldChangeHandler}/>
          <label htmlFor="lastName" className={Modernizr('input', 'placeholder') ? 'sr-only' : ''}>Last Name:</label>
          <input type="text" placeholder="Last Name" id="lastName" ref="lastName"
                 value={this.props.lastName} onChange={this.inputFieldChangeHandler}/>
          <label htmlFor="dob">Date of birth:</label>
          <InputDateView value={this.props.dob} id="dob" ref="dob" onChange={this.dateChangeHandler}/>
        </form>
        <ProgressBarView progress={this.getProgress()} showText/>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

//
// Redux
// -----------------------------------------------------------------------------

function mapStateToProps(state) {
  return {
    firstName: state.user.firstName || '',
    lastName: state.user.lastName || '',
    dob: state.user.dob || '',
    email: state.user.email || ''
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserDetails: bindActionCreators(UserEditAction.updateUserDetails, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditView);
