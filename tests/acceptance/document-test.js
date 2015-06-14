import Ember from 'ember';
import { test, module } from 'qunit';
import startApp from '../helpers/start-app';
import projectRoot from '../helpers/project-root';

var App;
var run = Ember.run;

/* global File, FileList */
module('Acceptance - Document', {
  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    run(App, 'destroy');
  }
});

test("should start with a new document to edit", function(assert) {
  assert.expect(2);

  visit('/');
  andThen(function() {
    assert.ok(find('textarea').length, "document edit pane is open");
    assert.ok(find('section:contains("New Document")').length, "document is new");
  });
});

test("should display a message when the document has unsaved changes", function(assert) {
  assert.expect(1);

  visit('/');
  andThen(function() {
    assert.ok(find('section:contains("Unsaved Changes")').length, "message is displayed");
  });
});

test("should display the name of the file when a new document is saved", function(assert) {
  assert.expect(3);

  var fs = require('fs');
  var path = require('path');
  var filename = path.join(projectRoot, 'tmp/tests/acceptance-new-doc.md');

  visit('/');

  andThen(function() {
    assert.ok(find('section:contains("New Document")').length, "'New Document' text is displayed");
  });

  andThen(function() {
    var file = new File(filename, 'acceptance-new-doc');
    var files = new FileList();
    files.append(file);

    $('input[nwsaveas]')[0].files = files;
  });

  andThen(function() {
    assert.equal(find('section:contains("New Document")').length, 0, "'New Document' text is not displayed");
    assert.equal(find('footer section').text().trim(), filename, "filename is displayed");

    if (fs.existsSync(filename)) {
      fs.unlinkSync(filename);
    }
  });
});

test("should open a document in the same window and discard current changes", function(assert) {
  assert.expect(3);

  var path = require('path');
  var filename = path.join(projectRoot, 'tests/fixtures/foo.md');

  visit('/');

  andThen(function() {
    fillIn('textarea', "# A _Markdown_ Document");
    assert.ok(find('section:contains("New Document")').length, "new document is loaded");

    var documentRoute = App.__container__.lookup('route:document');
    documentRoute.send('open', filename);
  });

  andThen(function() {
    assert.equal(find('footer section').text().trim(), filename, "another document is now open");
    assert.equal(find('textarea').val().trim(), '# foo bar baz', "content is displayed for the newly opened document");
  });
});

test("should display a preview of the document when Preview is clicked", function(assert) {
  assert.expect(2);

  visit('/');

  andThen(function() {
    fillIn('textarea', "# A _Markdown_ Document");
    click('li:contains("Preview")');
  });

  andThen(function() {
    assert.ok(find('div:contains("A Markdown Document")').length, "markdown preview is displayed");
    click('li:contains("Edit")');
  });

  andThen(function() {
    var textarea = find('textarea');
    assert.equal(textarea.val(), '# A _Markdown_ Document', "markdown source is displayed");
  });
});
