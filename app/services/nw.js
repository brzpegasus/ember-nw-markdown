import Ember from 'ember';

var get = Ember.get;

export default Ember.Service.extend(Ember.Evented, {
  fileUtil: get(window, 'process.mainModule.exports.fileUtil')
});
