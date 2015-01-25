import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    path: {
      refreshModel: true
    }
  },

  model: function(params) {
    if (params.path) {
      return this.store.find('document', params.path);
    } else {
      return this.store.createRecord('document');
    }
  },

  actions: {
    open: function(filename) {
      var controller = this.controller;

      // Rollback and unload the previous record for now.
      // Future pass should probably ask user to confirm.
      var model = controller.get('model');
      model.rollback();
      this.store.unloadRecord(model);

      // Open an existing file
      if (filename) {
        controller.set('path', filename);
        return;
      }

      // Open a new file
      if (controller.get('path')) {
        controller.set('path', null);
      } else {
        this.refresh();
      }
    },

    save: function(filename) {
      var wuphf = this.wuphf;
      var model = this.controller.get('model');

      if (filename) {
        model.set('filename', filename);
      }

      model.save().then(null, function(error) {
        wuphf.danger(error.message, 5000);
      });
    }
  }
});
