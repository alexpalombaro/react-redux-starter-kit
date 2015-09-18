import {style} from './UserEdit.scss';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {UserEditAction} from 'actions';

import {ProgressBarView} from 'views';


//
// Component
// -----------------------------------------------------------------------------
class UserEditView extends React.Component {

  constructor(props) {
    super(props);

    this.inputFields = [
      {name: 'firstName', placeholder: 'First Name'},
      {name: 'lastName', placeholder: 'Last Name'},
      {name: 'email', placeholder: 'Email'},
      {name: 'dob', type: 'date'}
    ];
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

  _generateInputFields():Array {
    return this.inputFields.map(({ placeholder, name, type = 'text' }) => {
      return <input type={type} key={name} ref={name}
                    placeholder={placeholder}
                    value={this.props[name]}
                    onChange={this._inputFieldChangeHandler}/>
    })
  }

  _getProgress():Number {
    const total = this.inputFields.filter((item) => {
      return this.props[item.name].length;
    });

    return (total.length / this.inputFields.length) * 100;
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
        <ProgressBarView progress={this._getProgress()} showText/>
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
