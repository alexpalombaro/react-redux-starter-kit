import {style} from './UserEdit.scss';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {UserEditAction} from 'actions';

import {ProgressBarView, InputDateView} from 'views';
import {debug} from 'utils';

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
    const inputs = Object.keys(this.refs).map((key) => {
      const element = this.refs[key];
      if (typeof element.getInputElement === 'function') {
        return element.getInputElement();
      }
      if (element.nodeName.toLowerCase() === 'input') {
        return element;
      }
    });

    const complete = inputs.filter((element) => {
      return element.value;
    });

    return (complete.length / inputs.length) * 100;
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

  dateChangeHandler = (event) => {
    var date = event.target.value;
    debug(date);
  };

  //
  // Render
  // -----------------------------------------------------------------------------

  render() {
    return (
      <div className={style}>
        <div className="input-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" placeholder="Joe" id="firstName" ref="firstName"
                 value={this.props.firstName} onChange={this.inputFieldChangeHandler}/>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" placeholder="Blogs" id="lastName" ref="lastName"
                 value={this.props.lastName} onChange={this.inputFieldChangeHandler}/>
          <label htmlFor="dob">Date of birth:</label>
          <InputDateView id="dob" ref="dob" onChange={this.dateChangeHandler}/>
        </div>
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
