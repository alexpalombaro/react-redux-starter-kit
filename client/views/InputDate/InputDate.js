import {style} from './InputDate.scss';
import {log, Modernizr, validDate} from 'utils';

import React from 'react';

//
// Component
// -----------------------------------------------------------------------------
class InputDateView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: validDate(props.value)
    };

    this.pendingValue = '';
  }

  static propTypes = {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
  };

  resolveInputType = () => {
    if (Modernizr(['inputtypes', 'date'])) {
      return <input type="date" className={this.state.isValid ? '' : 'invalid'}
                    onChange={this.dateChangeHandler} ref="inputDate" value={this.props.value}/>;
    }

    return <input type="text" className={this.state.isValid ? '' : 'invalid'}
                  onChange={this.dateChangeHandler} ref="inputDate" placeholder="dd/mm/yyyy"
                  value={this.pendingValue.length ? this.pendingValue : this.props.value}/>;
  };

  //
  // Event Handlers
  // -----------------------------------------------------------------------------

  dateChangeHandler = (event) => {
    const date = event.target.value;
    const isValid = validDate(date);
    if (this.state.isValid !== isValid) {
      this.setState({isValid});
    }

    if (this.props.onChange) {
      this.props.onChange(isValid ? date : null);
    }

    if (event.target.type === 'text') {
      this.pendingValue = date;
      event.target.value = this.pendingValue;
    }
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
