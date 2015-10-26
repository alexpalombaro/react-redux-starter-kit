//
// Imports
// -----------------------------------------------------------------------------
import {debug} from './DebugUtils';
import lodash from 'lodash';

//
// Export utilities
// -----------------------------------------------------------------------------
const ModernizrInstance = typeof window !== 'undefined' ? window.Modernizr : null;

/**
 *
 * @param {string|Array} prop string or array referencing Modernizr object property
 * @returns {boolean} If the feature is supported
 * @constructor
 */
export const Modernizr = (prop):Boolean => {
  const result =  ModernizrInstance !== null ? lodash.get(ModernizrInstance, prop, 'missing') : null;
  if (__DEV__) {
    if (result === 'missing') {
      debug(`Invalid Modernizr feature reference '${prop}'. Ensure feature is included in the config build.`);
    }
  }
  return result;
};

//
// Export external utilities
// -----------------------------------------------------------------------------
export {createConstants, createReducer} from './ReactReduxUtils';
export {shallowRender} from './ReactTestUtils';
export {debug} from './DebugUtils';
