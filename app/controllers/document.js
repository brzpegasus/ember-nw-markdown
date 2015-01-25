import Ember from 'ember';

export default Ember.Controller.extend({
  placeholder: 'New Document',
  fileHandle: Ember.computed.any('model.filename', 'placeholder')
});
