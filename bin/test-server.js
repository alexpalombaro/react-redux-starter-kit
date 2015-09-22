/*eslint-env es6, mocha*/

require('babel/register');

const server = require('../server'),
  request = require('supertest').agent(server.listen());

describe('Koa Server', () => {

  describe('GET /', () => {
    it('Should respond with a 200.', (done) => {
      request.get('/').expect(200, done);
    });
  });
});
