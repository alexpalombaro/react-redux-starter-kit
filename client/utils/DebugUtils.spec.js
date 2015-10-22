/* eslint-env browser, mocha, jasmine */

import {debug} from './DebugUtils';

describe('(utils) DebugUtils', () => {

  it('should attach a debug instance to window as logger', () => {
    expect(window.logger).to.be.a('function');
  })

});
