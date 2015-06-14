import Ember from 'ember';
import { test, module } from 'qunit';
import startApp from '../helpers/start-app';
import projectRoot from '../helpers/project-root';

var App;
var run = Ember.run;
var RSVP = Ember.RSVP;

module('Integration - Document Persistence', {
  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    run(App, 'destroy');
  }
});

test("should load a document from the file system into the store", function(assert) {
  assert.expect(4);

  var done = assert.async();
  var store = App.__container__.lookup('store:main');
  var path = require('path');
  var filename = path.join(projectRoot, 'tests/fixtures/foo.md');

  run(function() {
    store.find('document', filename).then(function(documentRecord) {
      assert.ok(documentRecord, "document was loaded");
      assert.equal(documentRecord.get('id'), filename, "document id is the filename");
      assert.equal(documentRecord.get('filename'), filename, "document filename is loaded");
      assert.equal(documentRecord.get('body'), '# foo bar baz\n', "document content was loaded");
      done();
    });
  });
});

test("should save a document from the store to the file system", function(assert) {
  assert.expect(3);

  var done = assert.async();
  var store = App.__container__.lookup('store:main');
  var path = require('path');
  var filename = path.join(projectRoot, 'tmp/tests/fixtures/bar.md');

  run(function() {
    var documentRecord = store.createRecord('document', {
      filename: filename,
      body: 'foo bar baz'
    });

    documentRecord.save().finally(function() {
      var fs = require('fs');

      assert.ok(fs.existsSync(filename), "document was created");
      assert.equal(documentRecord.get('isNew'), false, "document is no longer new");
      assert.equal(documentRecord.get('isDirty'), false, "document was saved");

      if (fs.existsSync(filename)) {
        fs.unlinkSync(filename);
      }

      done();
    });
  });
});

test("should not save a document with no filename", function(assert) {
  assert.expect(3);

  var store = App.__container__.lookup('store:main');

  run(function() {
    var documentRecord = store.createRecord('document', {
      body: 'foo bar baz'
    });

    assert.throws(documentRecord.save);
    assert.ok(documentRecord.get('isNew'), true, "document is still new");
    assert.ok(documentRecord.get('isDirty'), true, "document was not saved");
  });
});

test("should clear the filename if a new document could not be saved", function(assert) {
  assert.expect(2);

  var documentRecord;
  var container = App.__container__;
  var store = container.lookup('store:main');
  var documentAdapter = container.lookup('adapter:document');

  run(function() {
    documentAdapter.set('fileUtil', {
      writeFile: function() {
        return RSVP.reject();
      }
    });

    documentRecord = store.createRecord('document', {
      filename: '/path/to/file.md',
      body: 'foo bar baz'
    });
    documentRecord.save();
  });

  assert.equal(documentRecord.get('isNew'), true, "document was not saved");
  assert.equal(documentRecord.get('filename'), null, "filename was cleared");
});

test("should update a document from the store to the file system", function(assert) {
  assert.expect(3);

  var done = assert.async();
  var store = App.__container__.lookup('store:main');

  var fs = require('fs');
  var path = require('path');
  var filename = path.join(projectRoot, 'tmp/tests/fixtures/tomster.md');

  fs.writeFileSync(filename);

  run(function() {
    store.find('document', filename).then(function(documentRecord) {
      assert.equal(documentRecord.get('isDirty'), false, "document starts out clean");

      documentRecord.set('body', 'Once upon a time, there was a Tomster.');
      assert.equal(documentRecord.get('isDirty'), true, "document has unsaved changes");

      documentRecord.save().finally(function() {
        assert.equal(documentRecord.get('isDirty'), false, "document was updated");
        fs.unlinkSync(filename);
        done();
      });
    });
  });
});
