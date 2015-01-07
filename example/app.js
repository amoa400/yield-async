var async = require('../lib/async.js');
var fs = require('fs');

// read one file
var read = function*(path, resume) {
  var data = yield fs.readFile(path, resume);
  return data;
}

// read all files in one dir
var readAll = function*(path, resume) {
  var dir = yield fs.readdir(path, resume);
  if (dir.length === 0) {
    throw new Error('no file');
  }

  var files = {};
  for (var i = 0; i < dir.length; i++) {
    files[dir[i]] = yield async(read, [path + '/' + dir[i]], resume);
  }

  return files;
}

async(readAll, [__dirname], function(err, res) {
    console.log(err);
    console.log(res);
});