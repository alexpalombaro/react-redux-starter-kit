/* globals it expect describe */

import {updateMessage, updateMessageAsync} from 'actions';
import {actionTypes} from 'globals';

describe('(actions) AppActions', () => {
  describe('.updateMessage', () => {
    it('Should contain action with correct type and payload.', () => {
      const input = 'Secret message input variable';
      const output = updateMessage(input);
      expect(output).to.have.keys('type', 'payload');
      expect(output.payload).to.be.a('object');
      expect(output.payload).to.have.keys('message');
      expect(output.payload.message).to.equal(input);
    })
  });
});
