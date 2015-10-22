const logger = require('debug');
if (typeof window !== 'undefined') {
  window.logger = logger;
}
export const debug = logger('react-starter-kit');
