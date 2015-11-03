import {style} from './UserEdit.scss';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {UserEditAction} from 'actions';

import {ProgressBarView, InputDateView, InputView} from 'views';
import {log, Modernizr, validEmail, validDate} from 'utils';

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
  // Render
  // -----------------------------------------------------------------------------

  render() {
    const {updateUserDetails} = this.props;
    const labelClass = Modernizr('input', 'placeholder') ? 'sr-only' : '';
    const currentProgress = this.getProgress();
    return (
      <div className={style}>
        <form className="input-group"
              autoComplete="on">
          <label htmlFor="firstName"
                 className={labelClass}>First Name:</label>
          <InputView id="firstName"
                     type="text"
                     placeholder="First Name"
                     value={this.props.firstName}
                     onChange={value => updateUserDetails({firstName:value})}/>
          <label htmlFor="lastName"
                 className={labelClass}>Last Name:</label>
          <InputView id="lastName"
                     type="text"
                     placeholder="Last Name"
                     value={this.props.lastName}
                     onChange={value => updateUserDetails({lastName:value})}/>
          <label htmlFor="email"
                 className={labelClass}>Email:</label>
          <InputView id="email"
                     type="email"
                     placeholder="Email"
                     value={this.props.email}
                     validatorFn={validEmail}
                     onChange={value => updateUserDetails({email:value})}/>
          <label htmlFor="dob"
                 className={labelClass}>Date of birth:</label>
          <InputView id="dob"
                     type="date"
                     placeholder="dd/mm/yyyy"
                     value={this.props.dob}
                     validatorFn={validDate}
                     onChange={value => updateUserDetails({dob:value})}/>
          <input type="submit"
                 value="Update"
                 disabled={currentProgress < 100}/>
        </form>
        <ProgressBarView progress={currentProgress} showText/>
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
