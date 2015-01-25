import Ember from 'ember';
import env from '../environment';
import MenuEventHandler from '../mixins/menu-event-handler';

var run = Ember.run;

export default Ember.Component.extend(MenuEventHandler, {
  tagName: 'input',
  classNames: ['nw-input-file'],
  attributeBindings: ['type', 'nwsaveas', 'nwworkingdir'],

  type: 'file',
  nwsaveas: 'untitled.md',
  nwworkingdir: Ember.computed(function() {
    return env.get('userHome');
  }),

  change: function() {
    var filePath = this.$().val();
    this.sendAction('action', filePath);
    this.$().val('');
  },

  openFileDialog: function() {
    run.scheduleOnce('afterRender', this, function() {
      this.$().click();
    });
  },

  menuEvents: {
    fileSave: function() {
      if (this.get('file.isNew')) {
        this.openFileDialog();
      } else {
        this.sendAction();
      }
    }
  }
});
