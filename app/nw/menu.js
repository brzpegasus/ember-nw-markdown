import ENV from '../environment';
import gui from '../nw/gui';
import fileMenu from './menus/file';
import viewMenu from './menus/view';

export default function() {
  if (!ENV.isNodeWebKit) { return; }

  var menuBar = new gui.Menu({ type: 'menubar' });

  if (ENV.isMac) {
    menuBar.createMacBuiltin('Markdown Editor');
    menuBar.insert(fileMenu(), 1);
    menuBar.insert(viewMenu(), 2);
  } else {
    menuBar.append(fileMenu());
    menuBar.append(viewMenu());
  }

  gui.Window.get().menu = menuBar;

  return menuBar;
}
