import Ember from 'ember';
import nodeRequire from '../../services/node-require';

import Menu from '../base/menu';
import Save from './file/save';

var gui = nodeRequire('nw.gui');

export default Menu.extend({
  label: 'File',

  submenu: Ember.computed(function() {
    var submenu = new gui.Menu();
    var save = Save.create();
    submenu.append(save.get('object'));

    return submenu;
  })
});
