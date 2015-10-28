import {style} from './InputDate.scss';
import {log, Modernizr} from 'utils';

import React from 'react';

//
// Component
// -----------------------------------------------------------------------------
class InputDateView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: false
    }
  }

  static propTypes = {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
  };

  validateDate = (event) => {
    const date = event.target.value;
    const isValid = !!(date && date.length);
    if (this.state.isValid !== isValid) {
      this.setState({isValid});
      if (this.props.onChange) this.props.onChange(isValid ? date : null);
    }
  };

  resolveInputType = () => {
    if (Modernizr(['inputtypes', 'date'])) {
      return <input type="date" className={this.state.isValid ? '' : 'invalid'}
                    onChange={this.validateDate} ref="inputDate" value={this.props.value}/>;
    }

    return <input type="text" onChange={this.validateDate} ref="inputDate"
                  placeholder="dd/mm/yyyy" value={this.props.value}/>;
  };

  hasValidDate = () => {
    return this.state.isValid;
  };

  //
  // Render
  // -----------------------------------------------------------------------------
  render() {
    return (
      <div className={style}>
        {this.resolveInputType()}
      </div>
    );
  }

}

export default InputDateView
