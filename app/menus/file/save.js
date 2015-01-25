import Ember from 'ember';
import env from '../../environment';
import eventManager from '../../services/event';
import MenuItem from '../base/menu-item';

export default MenuItem.extend({
  label: 'Save',
  key: 's',

  modifiers: Ember.computed(function() {
    return env.get('cmdKey');
  }),

  click: function() {
    eventManager.trigger('fileSave');
  }
});
