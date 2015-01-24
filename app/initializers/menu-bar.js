import MenuBar from '../gui/menu-bar';
import env from '../environment';

export default {
  name: 'menu-bar',

  initialize: function(container, application) {
    if (!env.get('isNodeWebKit')) {
      return;
    }

    application.register('nw:menu', MenuBar, { singleton: true });
    application.inject('controller', 'menu', 'nw:menu');
    application.inject('component',  'menu', 'nw:menu');
    application.inject('route',      'menu', 'nw:menu');
  }
};
