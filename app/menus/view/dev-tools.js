import Ember from 'ember';
import env from '../../environment';
import MenuItem from '../base/menu-item';

export default MenuItem.extend({
  label: 'Developer Tools',
  key: 'i',

  modifiers: Ember.computed(function() {
    return env.get('cmdKey') + '+alt';
  }),

  width: 900,
  height: 600,

  click: function() {
    var win = env.get('appWindow');

    if (win.isDevToolsOpen()) {
      win.closeDevTools();
      return;
    }

    var devTools = win.showDevTools();
    var width = this.get('width');
    var height = this.get('height');

    devTools.resizeTo(width, height);
  }
});
