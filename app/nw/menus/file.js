import ENV from '../../environment';
import gui from '../gui';

export default function(nw) {
  if (!ENV.isNodeWebKit) { return; }

  var submenu = new gui.Menu();
  var cmd = ENV.cmdKey;

  submenu.append(new gui.MenuItem({
    label: 'New',
    key: 'n',
    modifiers: cmd,
    click: function() {
      nw.trigger('fileNew');
    }
  }));

  submenu.append(new gui.MenuItem({
    label: 'Open',
    key: 'o',
    modifiers: cmd,
    click: function() {
      nw.trigger('fileOpen');
    }
  }));

  submenu.append(new gui.MenuItem({
    label: 'Save',
    key: 's',
    modifiers: cmd,
    click: function() {
      nw.trigger('fileSave');
    }
  }));

  return new gui.MenuItem({ label: 'File', submenu: submenu });
}
