var fs     = require('fs');
var path   = require('path');
var RSVP   = require('rsvp');
var wrench = require('wrench');

var denodeify = RSVP.denodeify;
var readFile  = denodeify(fs.readFile);
var writeFile = denodeify(fs.writeFile);

exports.readFile = function(filename) {
  return readFile(filename, { encoding: 'utf8' });
};

exports.writeFile = function(filename, data) {
  var dirname = path.dirname(filename);
  if (!fs.existsSync(dirname)) {
    wrench.mkdirSyncRecursive(dirname, 0x1ff);
  }
  return writeFile(filename, data);
};
