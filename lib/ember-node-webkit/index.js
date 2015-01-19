'use strict';

var fs   = require('fs');
var path = require('path');
var EOL  = require('os').EOL;

function inlineScript(filename) {
  var src = path.join(__dirname, 'assets', filename);
  return '<script>' + fs.readFileSync(src) + '</script>';
}

module.exports = {
  name: 'ember-node-webkit',

  isDevelopingAddon: function() {
    return true;
  },

  contentFor: function(type, config) {
    if (type === 'body') {
      // Stub out common Node variables
      return inlineScript('shim-body.js');
    }

    if (type === 'body-footer') {
      // Restore Node variables
      var content = inlineScript('shim-body-footer.js');

      // Enable live reload in Node WebKit environment
      if (process.env.EMBER_ENV !== 'production') {
        content += EOL;
        content += inlineScript('live-reload.js');
      }

      return content;
    }
  }
};
