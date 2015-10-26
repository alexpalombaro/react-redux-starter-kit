import {style} from './InputDate.scss';
import {debug, Modernizr} from 'utils';

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
    debug(Modernizr('inputtypes.date2'));
    return (
      <input type='date' onChange={this.props.onChange}/>
    );
  }
}

export default InputDateView
