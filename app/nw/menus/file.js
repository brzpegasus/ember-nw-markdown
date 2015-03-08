import ENV from '../../environment';
import eventManager from '../../services/event';
import gui from '../gui';

export default function() {
  if (!ENV.isNodeWebKit) { return; }

  var submenu = new gui.Menu();
  var cmd = ENV.cmdKey;

  submenu.append(new gui.MenuItem({
    label: 'New',
    key: 'n',
    modifiers: cmd,
    click: function() {
      eventManager.trigger('fileNew');
    }
  }));

  submenu.append(new gui.MenuItem({
    label: 'Open',
    key: 'o',
    modifiers: cmd,
    click: function() {
      eventManager.trigger('fileOpen');
    }
  }));

  submenu.append(new gui.MenuItem({
    label: 'Save',
    key: 's',
    modifiers: cmd,
    click: function() {
      eventManager.trigger('fileSave');
    }
  }));

  return new gui.MenuItem({ label: 'File', submenu: submenu });
}
