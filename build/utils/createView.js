var fs = require('fs');
var args = require('yargs').argv;

var name = args._[0];

if (typeof name !== 'string' || !name.match(/^[A-Z]([A-Z]|[a-z])+$/)) {
  console.error('Missing valid view name.' +
    ' Ensure name starts with a capital letter and is a string.' +
    ' Ie node createView.js MyView');
  process.exit(9);
}

console.log(__dirname);
