/*eslint-env browser, phantomjs, es6, mocha, jasmine*/
/*eslint-disable no-unused-expressions*/

import {
  createConstants,
  createReducer,
  createDevToolsWindow,
  shallowRender
} from 'utils';

import {createStore} from 'redux';
import {devTools} from 'redux-devtools';

describe('(utils) ReactReduxUtils', () => {

  describe('.createConstants()', () => {
    it('Should return object with keys matching arguments', () => {
      const output = createConstants('keyA', 'keyB');
      expect(output).to.be.an('object');
      expect(output).to.have.all.keys({keyA: 'keyA', keyB: 'keyB'});
    })
  });

  describe('.createReducer()', () => {

    function actionCallbackA(state, payload) {
      const name = payload.name;
      return {...state, name}
    }

    function actionCallbackB(state, payload) {
      const age = payload.age;
      return {...state, age};
    }

    it('Should return a function that can be used as a reducer', () => {
      const initialState = {name: 'Bob', age: 30};
      const reducer = createReducer(initialState, {
        ['ACTION_A']: actionCallbackA,
        ['ACTION_B']: actionCallbackB
      });
      expect(reducer).to.be.a('function');
      expect(reducer(initialState, {type: 'MISSING_ACTION'})).to.equal(initialState);
      expect(reducer(initialState, {type: 'ACTION_A', payload: {name: 'Fred'}})).to.eql({name: 'Fred', age: 30});
      expect(reducer(initialState, {type: 'ACTION_B', payload: {age: 40}})).to.eql({name: 'Bob', age: 40});
    })

  });

  describe.only('.createDevToolsWindow()', () => {
    const initState = {firstName: 'FirstName', lastName: 'LastName'};
    const reducer = (prev, payload) => {
      return Object.assign({}, initState, prev, payload);
    };
    it('Should create a popup with the ReactRedux dev tools', (cb) => {
      const store = devTools()(createStore)(reducer);
      expect('getState' in store).to.be.true;
      const popup = createDevToolsWindow(store);
      setTimeout(()=> {
        expect(popup.document.getElementById('root')).to.exist;
        popup.close();
        cb();
      }, 100)
    })
  });

});
