import Ember from 'ember';

export default Ember.Mixin.create({
  autoFocus: Ember.on('didInsertElement', function() {
    this.$().focus();
  })
});
