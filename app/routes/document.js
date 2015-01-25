import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('document');
  },

  actions: {
    save: function(filePath) {
      var wuphf = this.wuphf;
      var doc = this.controller.get('model');

      if (filePath) {
        doc.set('filename', filePath);
      }

      doc.save().then(null, function(error) {
        wuphf.danger(error.message, 5000);
      });
    }
  }
});
