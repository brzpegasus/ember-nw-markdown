import Ember from 'ember';
import env from '../../../environment';
import MenuItem from '../../base/menu-item';

export default MenuItem.extend({
  label: 'Reload',
  key: 'r',

  modifiers: Ember.computed(function() {
    return env.get('cmdKey');
  }),

  click: function() {
    env.get('appWindow').reload();
  }
});
