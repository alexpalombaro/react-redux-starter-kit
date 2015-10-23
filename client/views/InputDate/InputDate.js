import {style} from './InputDate.scss';

import React from 'react';

//
// Component
// -----------------------------------------------------------------------------
class InputDateView extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
  };

  //
  // Render
  // -----------------------------------------------------------------------------
  render() {
    return (
      <input type='date' onChange={this.props.onChange}/>
    );
  }
}

export default InputDateView
