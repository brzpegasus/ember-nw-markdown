import Ember from 'ember';

var get = Ember.get;

export default Ember.Service.extend({
  fileUtil: get(window, 'process.mainModule.exports.fileUtil')
});
