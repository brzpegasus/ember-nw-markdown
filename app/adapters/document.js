import Ember from 'ember';
import DS from 'ember-data';

var computed = Ember.computed;
var inject   = Ember.inject;
var RSVP     = Ember.RSVP;

export default DS.Adapter.extend({
  nw: inject.service(),

  fileUtil: computed.alias('nw.fileUtil'),

  find: function(store, type, filename) {
    var promise = this.get('fileUtil').readFile(filename);

    return promise.then(function(data) {
      return {
        id: filename,
        filename: filename,
        body: data
      };
    });
  },

  createRecord: function(store, type, record) {
    var promise = this.saveRecord(record);

    return promise.catch(function(error) {
      record.set('filename', null);
      return RSVP.reject(error);
    });
  },

  updateRecord: function(store, type, record) {
    return this.saveRecord(record);
  },

  saveRecord: function(record) {
    var filename = record.get('filename');
    if (!filename) {
      return RSVP.reject(new Error("Filename cannot be null."));
    }

    return this.get('fileUtil').writeFile(filename, record.get('body'));
  }
});
