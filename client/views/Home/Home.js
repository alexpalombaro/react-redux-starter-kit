import styles from './Home.scss';

import React from 'react';
import {connect} from 'react-redux';

import {updateMessage, updateMessageAsync} from 'actions'

import {CreateUserView} from 'views';

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

  _clearMessage = () => {
    this.props.dispatch(updateMessage(''));
  };

  _updateInputTextHandler = (e) => {
    this.props.dispatch(updateMessage(e.target.value));
  };

  _updateAsyncMessage = () => {
    var select = this.refs.asyncDelaySelect;
    this.props.dispatch(updateMessageAsync('Updated message', select.value));
    console.log(styles);
  };

  render() {
    return (
      <div>
        <h1 className={styles.private}>{this.props.sample.message}</h1>
        <input type='text' value={this.props.sample.inputValue}
               onChange={this._updateInputTextHandler}/>
        <select ref='asyncDelaySelect'>
          <option value='1000'>1 second</option>
          <option value='1500'>1.5 seconds</option>
          <option value='2000'>2 seconds</option>
        </select>
        <button onClick={this._clearMessage}>Clear Message</button>
        <button onClick={this._updateAsyncMessage}>Update Async</button>
        <div>
          <p>This should be text in Roboto font</p>
        </div>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(HomeView);
