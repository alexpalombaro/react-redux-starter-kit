import {style} from './UserEdit.scss';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {UserEditAction} from 'actions';


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

  _generateInputFields() {
    const items = [
      {name: 'firstName', placeholder: 'First Name'},
      {name: 'lastName', placeholder: 'Last Name'},
      {name: 'email', placeholder: 'Email'},
      {name: 'dob', type: 'date'}
    ];

    return items.map(({ placeholder, name, type = 'text' }) => {
      return <input type={type} key={name} ref={name}
                    placeholder={placeholder}
                    value={this.props[name]}
                    onChange={this._inputFieldChangeHandler}/>
    })
  }

  //
  // Event handlers
  // -----------------------------------------------------------------------------

  _inputFieldChangeHandler = () => {
    this.props.updateUserDetails({
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      email: this.refs.email.value
    });
  };

  //
  // Render
  // -----------------------------------------------------------------------------

  render() {
    console.log('Rendering');
    return (
      <div className={style}>
        {this._generateInputFields()}
        <Link to='/'>Home</Link>
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
