[![yield-async Logo](https://raw.githubusercontent.com/amoa400/mycdn/master/images/logo/yield-async.png)](https://github.com/amoa400/yield-async)  
A simple tool to write program synchronously but run it asynchronously using yield.  

[![NPM Version](https://img.shields.io/npm/v/yield-async.svg?style=flat-square)](https://www.npmjs.org/package/yield-aysnc)&nbsp;&nbsp;[![Node.js Version](https://img.shields.io/badge/node.js-%3E%3D_0.11.13-brightgreen.svg?style=flat-square)](http://nodejs.org/download/)


***

### Installation
```bash
$ npm install yield-async
```
To use yield-async you must be running node `0.11.13` or higher for generator, and must run node(1) with the `--harmony` flag. If you don't install node `0.11.13`, you can install it using package `n` to run your `app.js`:
```bash
$ npm install -g n
$ n 0.11.13
$ node --harmony app.js
```
If you don't like typing `--harmony`, add an alias to your shell profile: 
```bash
$ alias node='node --harmony'
```

### Example
```js
var async = require('yield-async');
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
```


### Usage

#### async function
async function accepts 3 parameters:  
	`generator` the generator function you want to run  
	`parameters` the parameters passing to the generator function  
	`callback` callback function  

#### resume
every generator function must have the `resume` paramater, it will be used to 'replace' the callback function and resume the generator.

#### catch/throw
you can use `throw` to throw an error, and you can use `catch` to catch an error.

#### return
you can use `return` to return the result.