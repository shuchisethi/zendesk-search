const READ_FILES = require('read-files-promise');
const PATH = require('path');


async function readFiles(files) {
  const filesToRead = files.map(file => PATH.resolve(file));
  return READ_FILES(filesToRead, { encoding: 'utf8' }).then(buffers => buffers.map(buffer => JSON.parse(buffer)));
}

module.exports = {
  readFiles,
};
