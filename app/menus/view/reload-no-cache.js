import Ember from 'ember';
import env from '../../environment';
import MenuItem from '../base/menu-item';

export default MenuItem.extend({
  label: 'Reload (No Cache)',
  key: 'r',

  modifiers: Ember.computed(function() {
    return env.get('cmdKey') + '+shift';
  }),

  click: function() {
    env.get('appWindow').reloadIgnoringCache();
  }
});
