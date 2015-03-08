import Ember from 'ember';

var get = Ember.get;

export default Ember.Object.extend({
  fileUtil: get(window, 'process.mainModule.exports.fileUtil')
});
