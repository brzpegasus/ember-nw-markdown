'use strict';

// Export a config object for node-webkit-builder.
// See https://github.com/mllrsohn/node-webkit-builder#options.

module.exports = {
  appName: 'Markdown Editor',
  // Enable these options to include an application icon.
  // On a Mac, you must have Wine installed in order to package the app
  // for Windows with icon.
  platforms: ['osx64', 'win64', 'linux64'],
  winIco: 'build/icons/emberjs-logo.ico',
  macIcns: 'build/icons/emberjs-logo.icns',
  version: '0.12.2'
};
