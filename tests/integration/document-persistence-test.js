import Ember from 'ember';
import { test, module } from 'qunit';
import startApp from '../helpers/start-app';

var App;
var run = Ember.run;
var RSVP = Ember.RSVP;

module('Integration - Document Persistence', {
  beforeEach: function() {
    App = startApp();

    var container = App.__container__;
    var documentAdapter = container.lookup('adapter:document');

    run(function() {
      documentAdapter.set('fileUtil', {
        readFile: function(filename) {
          return RSVP.resolve('foo bar baz');
        },
        writeFile: function(filename, content) {
          return RSVP.resolve();
        }
      });
    });
  },

  afterEach: function() {
    run(App, 'destroy');
  }
});

test("should load a document from the file system into the store", function(assert) {
  assert.expect(4);

  var documentRecord;
  var store = App.__container__.lookup('store:main');

  run(function() {
    store.find('document', '/path/to/file.md').then(function(doc) {
      documentRecord = doc;
    });
  });

  assert.ok(documentRecord, "document was loaded");
  assert.equal(documentRecord.get('id'), '/path/to/file.md', "document id is the filename");
  assert.equal(documentRecord.get('filename'), '/path/to/file.md', "document filename is loaded");
  assert.equal(documentRecord.get('body'), 'foo bar baz', "document content was loaded");
});

test("should save a document from the store to the file system", function(assert) {
  assert.expect(2);

  var documentRecord;
  var container = App.__container__;
  var store = container.lookup('store:main');
  var documentAdapter = container.lookup('adapter:document');

  run(function() {
    documentRecord = store.createRecord('document', {
      filename: '/path/to/file.md',
      body: 'foo bar baz'
    });
    documentRecord.save();
  });

  assert.equal(documentRecord.get('isNew'), false, "document is no longer new");
  assert.equal(documentRecord.get('isDirty'), false, "document was saved");
});

test("should not save a document with no filename", function(assert) {
  assert.expect(2);

  var documentRecord;
  var container = App.__container__;
  var store = container.lookup('store:main');
  var documentAdapter = container.lookup('adapter:document');

  run(function() {
    documentRecord = store.createRecord('document', {
      body: 'foo bar baz'
    });
    documentRecord.save().catch(Ember.K);
  });

  assert.ok(documentRecord.get('isNew'), true, "document is still new");
  assert.ok(documentRecord.get('isDirty'), true, "document was not saved");
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

  var documentRecord;
  var store = App.__container__.lookup('store:main');

  run(function() {
    store.find('document', '/path/to/file.md').then(function(doc) {
      documentRecord = doc;
    });
  });

  assert.equal(documentRecord.get('isDirty'), false, "document starts out clean");

  run(documentRecord, 'set', 'body', 'Once upon a time, there was a Tomster.');
  assert.equal(documentRecord.get('isDirty'), true, "document has unsaved changes");

  run(documentRecord, 'save');
  assert.equal(documentRecord.get('isDirty'), false, "document was updated");
});
