import Ember from 'ember';
import ENV from '../environment';
import gui from '../nw/gui';
import fileMenu from './menus/file';
import viewMenu from './menus/view';

export default Ember.Object.extend(Ember.Evented, {
  createMenu: Ember.on('init', function() {
    if (!ENV.isNodeWebKit) { return; }

    var appMenu = this;
    var menuBar = new gui.Menu({ type: 'menubar' });

    if (ENV.isMac) {
      menuBar.createMacBuiltin('Markdown Editor');
      menuBar.insert(fileMenu(appMenu), 1);
      menuBar.insert(viewMenu(appMenu), 2);
    } else {
      menuBar.append(fileMenu(appMenu));
      menuBar.append(viewMenu(appMenu));
    }

    gui.Window.get().menu = menuBar;
  })
});
