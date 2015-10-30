import {style} from './Input.scss';
import {log, Modernizr} from 'utils';

import React from 'react';


//
// Component
// -----------------------------------------------------------------------------
class InputView extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    validatorFn: React.PropTypes.func,
    onChange: React.PropTypes.func
  };

  //
  // Render
  // -----------------------------------------------------------------------------
  render() {
    return (
      <div className={style}>
        <input {...this.props} onChange={this.onChangeHandler}/>
      </div>
    );
  }

  //
  // Event handlers
  // -----------------------------------------------------------------------------
  onChangeHandler = (event) => {
    if (typeof this.props.onChange !== 'function') return;

    if (typeof this.props.validatorFn !== 'function' ||
      this.props.validatorFn(event.target.value)) {
      this.props.onChange(event.target.value);
    }
  }
}

export default InputView
