/* eslint-disable vars-on-top */
require('babel/register');

var del = require('del');
var config = require('../config');

var paths = config.get('utils_paths');

del([
  paths.project(config.get('dir_dist')),
  paths.project(config.get('dir_temp'))
]).then((cleaned) => {
  cleaned.every(item => console.log(`Deleted ${item}`));
});
