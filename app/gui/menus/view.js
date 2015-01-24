import Ember from 'ember';
import nodeRequire from '../../services/node-require';

import Menu from '../base/menu';
import DevTools from './view/dev-tools';
import Reload from './view/reload';
import ReloadNoCache from './view/reload-no-cache';

var gui = nodeRequire('nw.gui');

export default Menu.extend({
  label: 'View',

  submenu: Ember.computed(function() {
    var submenu = new gui.Menu();

    var reload = Reload.create();
    var reloadNoCache = ReloadNoCache.create();
    var devTools = DevTools.create();

    submenu.append(reload.get('object'));
    submenu.append(reloadNoCache.get('object'));
    submenu.append(devTools.get('object'));

    return submenu;
  })
});
