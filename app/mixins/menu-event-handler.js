import Ember from 'ember';

var keys = Ember.keys;

export default Ember.Mixin.create({
  nw: Ember.inject.service(),

  mergedProperties: ['menuEvents'],

  addHandlers: Ember.on('init', function() {
    this.setEvents('on');
  }),

  setEvents: function(type) {
    var nw = this.get('nw');
    var events = this.get('menuEvents') || {};

    keys(events).forEach(function(name) {
      nw[type](name, this, events[name]);
    }, this);
  },

  willDestroy: function() {
    this.setEvents('off');
  }
});
