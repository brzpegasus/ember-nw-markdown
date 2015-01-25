import Ember from 'ember';
import env from '../environment';
import gui from '../nw/gui';

import FileMenu from './file';
import ViewMenu from './view';

export default Ember.Object.extend({
  init: function() {
    this.set('menubar', new gui.Menu({ type: 'menubar' }));
  },

  addMenus: Ember.on('init', function() {
    var menubar = this.get('menubar');
    var index = 0;

    if (env.get('isMac')) {
      menubar.createMacBuiltin('Ember Node WebKit');
    }

    var fileMenu = FileMenu.create();
    var viewMenu = ViewMenu.create();

    menubar.insert(fileMenu.get('object'), ++index);
    menubar.insert(viewMenu.get('object'), ++index);

    env.get('appWindow').menu = menubar;
  })
});
