import Ember from 'ember';

var computed = Ember.computed;

export default Ember.Controller.extend({
  queryParams: ['path'],
  path: null,
  placeholder: 'New Document',

  fileHandle: computed.any('model.filename', 'placeholder')
});
