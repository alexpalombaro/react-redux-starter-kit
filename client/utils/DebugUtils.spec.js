/* eslint-env browser, mocha, jasmine */

import {log} from './DebugUtils';

describe('(utils) DebugUtils', () => {

  it('should attach a log instance to window as logger', () => {
    expect(window.logger).to.be.a('function');
  })

});
