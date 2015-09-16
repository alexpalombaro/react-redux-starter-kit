require('babel/register');

//
// Modules and config
// -----------------------------------------------------------------------------

const fs = require('fs');
const path = require('path');
const args = require('yargs').argv;

const name = args._[0];

const config = require('../../config');
const paths = config.get('utils_paths');

//
// Argument validation
// -----------------------------------------------------------------------------

if (typeof name !== 'string' || !name.match(/^[A-Z]([A-Z]|[a-z])+$/)) {
  console.error('Missing valid reducer name.' +
    ' Ensure name starts with a capital letter and is a string,' +
    ' e.g. node createView.js MyView');
  process.exit(9);
}

//
// Core functionality
// -----------------------------------------------------------------------------

const dir = path.resolve(__dirname, '__templates__/reducer');

new Promise((resolve, reject) => {
  fs.readFile(path.resolve(dir, 'Reducer__js.txt'), 'utf8', (err, data) => {
    return err ? reject(err) : resolve(data);
  })
}).then((result) => {
  const filePath = paths.src('reducers');
  fs.writeFileSync(path.resolve(filePath, `${name}.js`), result);
}).catch((err) => {
  console.error(err);
});
