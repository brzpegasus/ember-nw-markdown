import Ember from 'ember';
import ENV from '../environment';
import MenuEventHandler from '../mixins/menu-event-handler';

var computed = Ember.computed;
var run      = Ember.run;

export default Ember.Component.extend(MenuEventHandler, {
  tagName: 'input',
  attributeBindings: ['type', 'nwworkingdir'],
  type: 'file',

  nwworkingdir: computed(function() {
    return ENV.userHome;
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
  }
});
