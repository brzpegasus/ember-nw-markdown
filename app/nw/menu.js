import Ember from 'ember';
import ENV from '../environment';
import gui from '../nw/gui';
import fileMenu from './menus/file';
import viewMenu from './menus/view';

export default Ember.Object.extend({
  nw: Ember.inject.service(),

  createMenu: Ember.on('init', function() {
    if (!ENV.isNodeWebKit) { return; }

    var nw = this.get('nw');
    var menuBar = new gui.Menu({ type: 'menubar' });

    if (ENV.isMac) {
      menuBar.createMacBuiltin('Markdown Editor');
      menuBar.insert(fileMenu(nw), 1);
      menuBar.insert(viewMenu(nw), 2);
    } else {
      menuBar.append(fileMenu(nw));
      menuBar.append(viewMenu(nw));
    }

    gui.Window.get().menu = menuBar;
  })
});
