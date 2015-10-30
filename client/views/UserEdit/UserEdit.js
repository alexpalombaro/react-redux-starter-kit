import {style} from './UserEdit.scss';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {UserEditAction} from 'actions';

import {ProgressBarView, InputDateView, InputView} from 'views';
import {log, Modernizr, validEmail} from 'utils';

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
    const props = ['firstName', 'lastName', 'dob', 'email'];
    const done = props.filter((prop) => {
      return this.props[prop].length > 0;
    });

    return (done.length / props.length) * 100;
  };

  //
  // Event handlers
  // -----------------------------------------------------------------------------

  dateChangeHandler = (value) => {
    this.props.updateUserDetails({
      dob: value
    })
  };

  //
  // Render
  // -----------------------------------------------------------------------------

  render() {
    const {updateUserDetails} = this.props;
    const labelClass = Modernizr('input', 'placeholder') ? 'sr-only' : '';
    return (
      <div className={style}>
        <form className="input-group" autoComplete="on">
          <label htmlFor="firstName" className={labelClass}>First Name:</label>
          <InputView id="firstName" type="text" placeholder="First Name" value={this.props.firstName}
                     onChange={value => updateUserDetails({firstName:value})}/>
          <label htmlFor="lastName" className={labelClass}>Last Name:</label>
          <InputView type="text" placeholder="Last Name" id="lastName" value={this.props.lastName}
                     onChange={value => updateUserDetails({lastName:value})}/>
          <label htmlFor="email" className={labelClass}>Email:</label>
          <InputView id="email" type="text" placeholder="Email" value={this.props.email}
                     validatorFn={validEmail}
                     onChange={value => updateUserDetails({email:value})}/>
          <label htmlFor="dob">Date of birth:</label>
          <InputDateView value={this.props.dob} id="dob" ref="dob" onChange={this.dateChangeHandler}/>
          <input type="submit" value="Update"/>
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
