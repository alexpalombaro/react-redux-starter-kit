import {style} from './Input.scss';
import {log, Modernizr} from 'utils';

import React from 'react';


//
// Component
// -----------------------------------------------------------------------------
class InputView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValid: -1,
      pending: ''
    };
  }

  static propTypes = {
    validatorFn: React.PropTypes.func,
    onChange: React.PropTypes.func
  };

  //
  // Render
  // -----------------------------------------------------------------------------
  render() {
    const {inputValid, pending} = this.state;
    const props = Object.assign({}, this.props, {
      'className': inputValid > 0 ? 'valid' : inputValid < 0 ? '' : 'invalid',
      'value': pending.length ? pending : this.props.value,
      'onChange': this.onChangeHandler
    });
    return (
      <div className={style}>
        <input {...props}/>
      </div>
    );
  }

  //
  // Event handlers
  // -----------------------------------------------------------------------------
  onChangeHandler = (event) => {
    const {value} = event.target;
    const {validatorFn, onChange} = this.props;
    let inputValid = value.length ? 1 : -1;
    if (typeof validatorFn === 'function' && value.length > 0) {
      inputValid = validatorFn(value) ? 1 : 0;
    }

    let pending = value;
    if (typeof onChange === 'function' && inputValid) {
      onChange(value);
      pending = '';
    }

    this.setState({
      pending,
      inputValid
    })
  }
}

export default InputView
