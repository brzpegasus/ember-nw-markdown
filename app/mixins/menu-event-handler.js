import Ember from 'ember';
import eventManager from '../services/event';

var keys = Ember.keys;

export default Ember.Mixin.create({
  mergedProperties: ['menuEvents'],

  addHandlers: Ember.on('init', function() {
    this.setEvents('on');
  }),

  setEvents: function(type) {
    var events = this.get('menuEvents') || [];

    keys(events).forEach(function(name) {
      eventManager[type](name, this, events[name]);
    }, this);
  },

  willDestroy: function() {
    this.setEvents('off');
  }
});
