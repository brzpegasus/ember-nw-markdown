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

  createRecord: function(store, type, snapshot) {
    var promise = this.saveRecord(snapshot);

    return promise.catch(function(error) {
      snapshot.record.set('filename', null);
      return RSVP.reject(error);
    });
  },

  updateRecord: function(store, type, snapshot) {
    return this.saveRecord(snapshot);
  },

  saveRecord: function(snapshot) {
    var filename = snapshot.attr('filename');
    if (!filename) {
      return RSVP.reject(new Error("Filename cannot be null."));
    }

    return this.get('fileUtil').writeFile(filename, snapshot.attr('body'));
  }
});
