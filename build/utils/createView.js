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

const connect = !!args.connect;

//
// Argument validation
// -----------------------------------------------------------------------------

if (typeof name !== 'string' || !name.match(/^[A-Z]([A-Z]|[a-z])+$/)) {
  console.error('Missing valid view name.' +
    ' Ensure name starts with a capital letter and is a string,' +
    ' e.g. node createView.js MyView');
  process.exit(9);
}

//
// Core functionality
// -----------------------------------------------------------------------------

const dir = path.resolve(__dirname, '__templates__');

new Promise((resolve, reject) => {
  fs.readdir(dir, (err, files) => err ? reject(err) : resolve(files))
}).then((result) => {
  return new Promise((resolve) => {
    var fileList = [], total = result.length;
    result.forEach((filename) => {
      fs.readFile(path.resolve(dir, filename), 'utf-8', (err, data) => {
        if (!connect && /ViewConnect__js/.test(filename) || connect && /View__js/.test(filename)) {
          return total--;
        }
        fileList.push({fileName: filename, fileData: err || data});
        if (fileList.length === total) {
          resolve(fileList);
        }
      });
    });
  })
}).then((result) => {
  function resolveFileName(fileName) {
    if (fileName.match(/^package/)) {
      return 'package.json';
    }
    return name + '.' + (fileName.replace(/__/g, '.').replace(/^.+?\.(.+)\.txt$/, '$1'));
  }
  return new Promise((resolve, reject) => {
    var total = result.length;
    result.forEach((data) => {
      var fileData = data.fileData.replace(/\$\{NAME\}/g, name);
      var fileName = resolveFileName(data.fileName);
      var filePath = path.resolve(paths.src('views'), name, fileName);
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath));
      }
      fs.writeFile(filePath, fileData, (err) => {
        if (err) {
          reject(err)
        } else if (!--total) {
          resolve();
        }
      });
    })
  })
}).catch((err) => {
  console.log(err);
  process.exit(0);
}).then(() => {
  return new Promise((resolve, reject) => {
    const file = paths.src('views/index.js');
    fs.readFile(file, 'utf8', (err, data) => {
      return err ? reject(err) : resolve({file, data});
    })
  });
}).then((result) => {
  fs.writeFileSync(result.file, `export {default as ${name + 'View'}} from './${name}';\n${result.data}`);
}).catch((err) => {
  console.error(err);
});
