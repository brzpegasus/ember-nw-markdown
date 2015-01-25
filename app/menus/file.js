import Ember from 'ember';
import gui   from '../nw/gui';

import Menu from './base/menu';
import New  from './file/new';
import Open from './file/open';
import Save from './file/save';

export default Menu.extend({
  label: 'File',

  submenu: Ember.computed(function() {
    var submenu = new gui.Menu();

    var _new = New.create();
    var open = Open.create();
    var save = Save.create();

    submenu.append(_new.get('object'));
    submenu.append(open.get('object'));
    submenu.append(save.get('object'));

    return submenu;
  })
});
