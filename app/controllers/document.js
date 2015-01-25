import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['path'],
  path: null,

  placeholder: 'New Document',
  fileHandle: Ember.computed.any('model.filename', 'placeholder')
});
