require('babel/register');

const fs = require('fs');
const path = require('path');
const args = require('yargs').argv;

const name = args._[0];

const config = require('../../config');

if (typeof name !== 'string' || !name.match(/^[A-Z]([A-Z]|[a-z])+$/)) {
  console.error('Missing valid view name.' +
    ' Ensure name starts with a capital letter and is a string,' +
    ' e.g. node createView.js MyView');
  process.exit(9);
}

const dir = path.resolve(__dirname, '__templates__');

new Promise((resolve, reject) => {
  fs.readdir(dir, (err, files) => err ? reject(err) : resolve(files))
}).then((result) => {
  return new Promise((resolve) => {
    var fileList = [];
    result.forEach((filename) => {
      fs.readFile(path.resolve(dir, filename), 'utf-8', (err, data) => {
        fileList.push({fileName: filename, fileData: err || data});
        if (fileList.length === result.length) {
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
    result.forEach((data) => {
      var fileData = data.fileData.replace(/\$\{NAME\}/g, name);
      var fileName = resolveFileName(data.fileName);
      var filePath = path.resolve(config.get('utils_paths').src('views'), name, fileName);
      var length = result.length;
      var directory = path.dirname(filePath);
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath));
      }
      fs.writeFile(filePath, fileData, (err) => {
        if (err) {
          reject(err)
        } else if (!--length) {
          resolve();
        }
      });
    })
  })
}).catch((err) => {
  console.log(err);
});
