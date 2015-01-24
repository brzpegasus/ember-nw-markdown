import Ember from 'ember';
import nodeRequire from '../../services/node-require';

var gui = nodeRequire('nw.gui');

export default Ember.Object.extend({
  createMenu: Ember.on('init', function() {
    var menuItem = new gui.MenuItem({
      label:   this.get('label'),
      submenu: this.get('submenu')
    });

    this.set('object', menuItem);
  })
});
