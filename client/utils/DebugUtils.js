const logger = require('debug');
if (typeof window !== 'undefined') {
  window.logger = logger;
}

const instances = new Map();

/**
 *
 * @param {string} name The name of the new logging instance
 * @returns {logger} instance of debug module
 */
export function createLogger(name) {
  return instances.get(name) ||
    instances.set(name, logger(name)).get(name);
}

// default logging fn
export const log = logger('react-starter-kit');
