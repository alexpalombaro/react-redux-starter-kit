/*eslint-env browser, phantomjs, es6, mocha, jasmine*/
/*eslint-disable no-unused-expressions*/

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import ProgressBarView from './ProgressBar';

describe('(view) ProgressBar', () => {

  it('Should render a progress bar component with default props using bootstrap classes', () => {
    const component = ReactTestUtils.renderIntoDocument(<ProgressBarView/>);
    expect(component.props).to.deep.equal({progress: 0, showText: false});
    let node = ReactDOM.findDOMNode(component);
    node = node.getElementsByClassName('progress');
    expect(node.length).to.equal(1);
    node = node[0].getElementsByClassName('progress-bar');
    expect(node.length).to.equal(1);
    node = node[0];
    expect(node.style.width).to.equal('0%');
    expect(node.innerHTML).to.equal('');
  });

  it('Should render a progress bar at 50% width of component', () => {
    const component = ReactTestUtils.renderIntoDocument(<ProgressBarView progress={50}/>);
    expect(component.props.progress).to.equal(50);
    let node = ReactDOM.findDOMNode(component);
    node = node.getElementsByClassName('progress-bar')[0];
    expect(node.style.width).to.equal('50%');
    expect(node.innerHTML).to.equal('');
  });

  it('Should render progress bar at 80% width and include inner text', () => {
    const component = ReactTestUtils.renderIntoDocument(<ProgressBarView progress={80} showText/>);
    expect(component.props).to.deep.equal({progress: 80, showText: true});
    let node = ReactDOM.findDOMNode(component);
    node = node.getElementsByClassName('progress-bar')[0];
    expect(node.style.width).to.equal('80%');
    expect(node.innerHTML).to.equal('80%');
  })
});
