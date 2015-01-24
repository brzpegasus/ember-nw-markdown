import Ember from 'ember';
import nodeRequire from '../../services/node-require';

var gui = nodeRequire('nw.gui');

export default Ember.Object.extend({
  createMenuItem: Ember.on('init', function() {
    var menuItem = new gui.MenuItem({
      label:     this.get('label') || '',
      key:       this.get('key'),
      modifiers: this.get('modifiers'),

      click: function() {
        this.click();
      }.bind(this)
    });

    this.set('object', menuItem);
  }),

  click: Ember.K
});
