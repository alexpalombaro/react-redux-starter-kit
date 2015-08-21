import React from 'react';
import {connect} from 'react-redux';

import {updateMessage} from 'actions'

class HomeView extends React.Component {

  constructor(props) {
    super(props);

    this._clearMessage = this._clearMessage.bind(this);
    this._updateInputTextValue = this._updateInputTextValue.bind(this);
  }

  static propTypes = {
    sample: React.PropTypes.shape({
      message: React.PropTypes.string.isRequired,
      inputValue: React.PropTypes.string.isRequired
    })
  };

  _clearMessage() {
    this.props.dispatch(updateMessage(''));
  }

  _updateInputTextValue(e) {
    this.props.dispatch(updateMessage(e.target.value));
  }

  render() {
    return (
      <div className='view view--home container'>
        <h1 className='text-center'>{this.props.sample.message}</h1>
        <input type='text' ref='inputText' value={this.props.sample.inputValue}
               onChange={this._updateInputTextValue}/>
        <button onClick={this._clearMessage}>Clear Message</button>
      </div>
    );
  }
}

export default connect(state => state)(HomeView);
