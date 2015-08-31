/* eslint-disable no-process-env */

console.log('Running compile in ' + (process.env.NODE_ENV || 'development') + ' mode.');

if (process.env.NODE_ENV === 'production') {
  module.exports = exports = [
    require('./build/webpack/client')(),
    require('./build/webpack/server')()
  ];
} else {
  module.exports = exports = [
    require('./build/webpack/client')()
  ];
}
