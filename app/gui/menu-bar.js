import Ember from 'ember';
import nodeRequire from '../services/node-require';

var gui = nodeRequire('nw.gui');

export default Ember.Object.extend(Ember.Evented, {
  init: function() {
    var menubar = new gui.Menu({ type: 'menubar' });
    this.set('menubar', menubar);
  },

  appWindow: Ember.computed(function() {
    return gui.Window.get();
  }),

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

    menubar.insert(this.get('fileMenu'), 1);
    menubar.insert(this.get('viewMenu'), 2);

    this.get('appWindow').menu = menubar;
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
  }),

  viewMenu: Ember.computed(function() {
    var viewMenu = new gui.Menu();
    var win = this.get('appWindow');

    viewMenu.append(new gui.MenuItem({
      label: 'Developer Tools',
      key: 'i',
      modifiers: this.get('cmdKey') + '+alt',
      click: function() {
        if (win.isDevToolsOpen()) {
          win.closeDevTools();
        } else {
          win.showDevTools();
        }
      }
    }));

    return new gui.MenuItem({
      label: 'View',
      submenu: viewMenu
    });
  })
});
