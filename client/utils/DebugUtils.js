const logger = require('debug');
if (typeof window !== 'undefined') {
  window.logger = logger;
}
export const log = logger('react-starter-kit');
