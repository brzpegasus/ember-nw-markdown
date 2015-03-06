# Ember NW.js Markdown Editor

A GitHub-flavored markdown editor built with [Ember](http://emberjs.com) and [NW.js](http://nwjs.io).

It provides functionality for creating new markdown documents, saving them to disk, and re-opening them for preview or further editing.

This project demonstrates ways you can develop a native application using NW.js and Ember.
It makes use of the [`ember-cli-node-webkit`](http://github.com/brzpegasus/ember-cli-node-webkit) addon to help you be more productive during development.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)
* [NW.js](http://nwjs.io/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember nw`
* The app will launch in a NW.js Chromium window.

See the `ember-cli-node-webkit` addon [installation notes](https://github.com/brzpegasus/ember-cli-node-webkit#nwjs-binary) to properly set up NW.js.

You can also run a NW.js-less version of the app in the browser:

* `ember serve`
* Visit the app at [http://localhost:4200](http://localhost:4200).

This version lets you edit and preview documents but you won't be able to save them.
This is largely useful during development when you need to focus on a specific piece of functionality that doesn't depend on NW.js, and want to take full advantage of your browser's dev tools and extensions, such as the much valuable Ember Inspector. You can still make use of Chromium's dev tools in a NW.js environment, but it is not as feature-rich and lacks browser extensions.

### Running Tests

TBD

### Building & Packaging

* `ember build --environment production`

The functionality to package up the app into a NW.js executable is not yet available. You can easily write a shell script to assemble the `package.json`, required `node_modules`, and `dist` folder together with the NW.js binaries. There will be an `ember nw:deploy` command or so coming up in the near future.
