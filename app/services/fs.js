import Ember from 'ember';
import require from '../nw/require';

var fs     = require('fs') || {};
var path   = require('path');
var wrench = require('wrench');

var denodeify = Ember.RSVP.denodeify;
var merge     = Ember.merge;

var readFile  = denodeify(fs.readFile);
var writeFile = denodeify(fs.writeFile);

function mkdirIfNotExists(dirname) {
  if (!fs.existsSync(dirname)) {
    wrench.mkdirSyncRecursive(dirname, 0x1ff);
  }
}

export default {
  readFile: function(filename, options) {
    var readOptions = {
      encoding: 'utf8'
    };
    merge(readOptions, options);

    return readFile(filename, readOptions);
  },

  writeFile: function(filename, data) {
    var dirname = path.dirname(filename);
    mkdirIfNotExists(dirname);

    return writeFile(filename, data);
  }
};
