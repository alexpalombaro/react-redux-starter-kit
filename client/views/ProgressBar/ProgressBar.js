import {style} from './ProgressBar.scss';

import React from 'react';

//
// Component
// -----------------------------------------------------------------------------
class ProgressBarView extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    progress: 0,
    showText: false
  };

  static propTypes = {
    progress: React.PropTypes.number.isRequired,
    showText: React.PropTypes.bool.isRequired
  };

  //
  // Render
  // -----------------------------------------------------------------------------
  render() {
    const {progress, showText} = this.props;
    const rounded = Math.round(progress);
    return (
      <div className={style}>
        <div className='progress'>
          <div className='progress-bar' role='progressbar' aria-valuenow={rounded}
               aria-valuemax='100' style={{width: `${rounded}%`}}>
            {showText ? `${rounded}%` : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressBarView
