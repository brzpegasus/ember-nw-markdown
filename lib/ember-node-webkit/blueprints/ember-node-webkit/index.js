'use strict';

var fs    = require('fs');
var path  = require('path');
var chalk = require('chalk');
var RSVP  = require('rsvp');

var denodeify = RSVP.denodeify;
var readFile  = denodeify(fs.readFile);
var writeFile = denodeify(fs.writeFile);

function addNwConfig(source) {
  var json = JSON.parse(source);

  json.main = 'dist/index.html';

  json.window = {
    toolbar: true,
    frame: true,
    width: 800,
    height: 500,
    min_width: 400,
    min_height: 200
  };

  return json;
}

function updatePackage(project, options) {
  if (project.pkg.main) {
    return;
  }

  var ui = options.ui;
  var pkgPath = path.join(project.root, 'package.json');

  return readFile(pkgPath, { encoding: 'utf8' })
    .then(function(source) {
      return addNwConfig(source);
    })
    .then(function(json) {
      ui.writeLine('  ' + chalk.yellow('overwrite') + ' package.json');
      return writeFile(pkgPath, JSON.stringify(json, null, '  '));
    })
    .catch(function(err) {
      ui.writeLine(chalk.red('Error updating package.json.'));
      ui.writeError(err);
    });
}

module.exports = {
  description: 'Blueprint for Ember NW.js projects',

  normalizeEntityName: function(entityName) {
    return entityName;
  },

  afterInstall: function(options) {
    if (!options.dryRun) {
      return updatePackage(options.project, options);
    }
  }
};
