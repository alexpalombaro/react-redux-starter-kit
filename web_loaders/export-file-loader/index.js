require('babel/register');

const fs = require('fs');
const path = require('path');
const config = require('../../config');

const paths = config.get('utils_paths');
const dir = paths.project(config.get('dir_temp'));

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

module.exports = function (data) {

  const fileName = path.basename(this.resourcePath, path.extname(this.resourcePath));
  fs.writeFileSync(path.resolve(dir, fileName + '.js'), data);

  return data;
};