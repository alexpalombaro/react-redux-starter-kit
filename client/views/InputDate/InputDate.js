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
    date: React.PropTypes.string
  };

  validateInputText = () => {
    var date = event.target.value;
    debug(date);
  };

  resolveInputType = () => {
    if (Modernizr(['inputtypes', 'date'])) {
      return <input type="date" onChange={this.props.onChange} ref="inputDate"
                    value={this.props.date}/>
    }
    return <input type="text" onChange={this.validateInputText} ref="inputDate"
                  placeholder="dd/mm/yyyy" value={this.props.date}/>
  };

  getInputElement = () => {
    return this.refs.inputDate;
  }

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
