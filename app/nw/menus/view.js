import ENV from '../../environment';
import gui from '../gui';

export default function() {
  if (!ENV.isNodeWebKit) { return; }

  var submenu = new gui.Menu();
  var cmd = ENV.cmdKey;

  submenu.append(new gui.MenuItem({
    label: 'Reload',
    key: 'r',
    modifiers: cmd,
    click: function() {
      gui.Window.get().reload();
    }
  }));

  submenu.append(new gui.MenuItem({
    label: 'Reload (No Cache)',
    key: 'r',
    modifiers: cmd + '+shift',
    click: function() {
      gui.Window.get().reloadIgnoringCache();
    }
  }));

  submenu.append(new gui.MenuItem({
    label: 'Developer Tools',
    key: 'i',
    modifiers: cmd + '+alt',
    click: function() {
      var win = gui.Window.get();

      if (win.isDevToolsOpen()) {
        win.closeDevTools();
        return;
      }

      var devTools = win.showDevTools();
      devTools.resizeTo(900, 600);
    }
  }));

  return new gui.MenuItem({ label: 'View', submenu: submenu });
}
