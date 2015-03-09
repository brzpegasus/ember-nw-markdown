import Ember from 'ember';

var keys = Ember.keys;

export default Ember.Mixin.create({
  mergedProperties: ['menuEvents'],

  addHandlers: Ember.on('init', function() {
    this.setEvents('on');
  }),

  setEvents: function(type) {
    var menu = this.get('menu');
    var events = this.get('menuEvents') || [];

    keys(events).forEach(function(name) {
      menu[type](name, this, events[name]);
    }, this);
  },

  willDestroy: function() {
    this.setEvents('off');
  }
});
