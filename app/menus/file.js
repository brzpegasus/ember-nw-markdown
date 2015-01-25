import Ember from 'ember';
import gui from '../nw/gui';

import Menu from './base/menu';
import Save from './file/save';

export default Menu.extend({
  label: 'File',

  submenu: Ember.computed(function() {
    var submenu = new gui.Menu();
    var save = Save.create();
    submenu.append(save.get('object'));

    return submenu;
  })
});
