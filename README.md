# Ember NW.js Markdown Editor

A GitHub-flavored markdown editor built with [Ember](http://emberjs.com) and [NW.js](http://nwjs.io).

_This project serves as an example for how you could develop a native desktop application using NW.js and Ember.
It also makes use of the [`ember-cli-node-webkit`](http://github.com/brzpegasus/ember-cli-node-webkit) addon for all build and packaging needs._

![Markdown Editor](https://cloud.githubusercontent.com/assets/1691398/6768192/536a6fde-d033-11e4-9375-e2f506c1c8c7.png)

## Prerequisites

You will need the following things properly installed on your computer.

* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

```
git clone git@github.com:brzpegasus/ember-nw-markdown.git
cd ember-nw-markdown
npm install
bower install
```

## Running in NW.js

* `ember nw`

## Running in the Browser

You can run a NW.js-less version of the app in the browser:

* `ember serve`
* Visit the app at [http://localhost:4200](http://localhost:4200).

This version lets you edit and preview documents but you won't have access to any functionality that depends on NW.js, such as the application menu, keyboard shortcuts, and anything that touches the file system. This is useful during development when the area you are focusing on does not depend on NW.js, and you need to access advanced debugging tools or extensions not available in NW.js's dev tools (e.g. Ember Inspector).

### Running Tests

* `ember nw:test` for continuous integration
* `ember nw:test --server` for development

### Packaging

* `ember nw:package`

The packaged app will be stored in `build/app`.
