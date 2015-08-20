import React from 'react';
import { connect } from 'react-redux';

import { updateMessage, clearMessage } from 'actions'

class HomeView extends React.Component {

  constructor() {
    super();

    this._updateMessage = this._updateMessage().bind(this);
    this._clearMessage = this._clearMessage().bind(this);
  }

  _updateMessage(message) {
    this.props.dispatch(updateMessage(message));
  }

  _clearMessage() {

  }

  render() {
    console.log(this.props);
    return (
      <div className='view view--home container'>
        <h1 className='text-center'>{this.props.sample.message}</h1>
        <input type='text' ref='inputText'/>
        <button onClick={this._updateMessage()}>Update Message</button>
        <button onClick={this._clearMessage()}>Clear Message</button>
      </div>
    );
  }
}

export default connect(state => state)(HomeView);
