import Ember from 'ember';
import gui from './nw-gui';

export default Ember.Object.extend(Ember.Evented, {
  init: function() {
    var menubar = new gui.Menu({ type: 'menubar' });
    this.set('menubar', menubar);
  },

  isMacOS: Ember.computed(function() {
    /* global process */
    return process.platform === 'darwin';
  }),

  cmdKey: Ember.computed('isMacOS', function() {
    return this.get('isMacOS') ? 'cmd' : 'ctrl';
  }),

  addMenus: Ember.on('init', function() {
    var menubar = this.get('menubar');

    if (this.get('isMacOS')) {
      menubar.createMacBuiltin('Ember Node WebKit');
    }

    var fileMenu = this.get('fileMenu');
    menubar.insert(fileMenu, 1);

    gui.Window.get().menu = menubar;
  }),

  fileMenu: Ember.computed(function() {
    var fileMenu = new gui.Menu();

    fileMenu.append(new gui.MenuItem({
      label: 'Save',
      key: 's',
      modifiers: this.get('cmdKey'),
      click: function() {
        this.trigger('fileSave');
      }.bind(this)
    }));

    return new gui.MenuItem({
      label: 'File',
      submenu: fileMenu
    });
  })
});
