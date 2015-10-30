//
// Imports
// -----------------------------------------------------------------------------
import {log} from './DebugUtils';
import lodash from 'lodash';

//
// Export utilities
// -----------------------------------------------------------------------------
const ModernizrInstance = typeof window !== 'undefined' ? window.Modernizr : null;

/**
 *
 * @param {array|string|args} params Comma seperated reference to Modernizr object
 * @returns {boolean} If the feature is supported
 * @constructor
 */
export const Modernizr = function (...params):Boolean {
  const array = lodash.flattenDeep(params);
  const result = ModernizrInstance !== null ? lodash.get(ModernizrInstance, array, 'missing') : null;
  if (__DEV__) {
    if (result === 'missing') {
      log(`Invalid Modernizr feature reference '${array}'. Ensure feature is included in the config build.`);
    }
  }
  return result === 'missing' ? false : result;
};

//
// Export external utilities
// -----------------------------------------------------------------------------
export {createConstants, createReducer} from './ReactReduxUtils';
export {shallowRender} from './ReactTestUtils';
export {log, createLogger} from './DebugUtils';
export {validDate, validEmail} from './ValidatorUtils';
