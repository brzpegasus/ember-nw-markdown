import AppMenu from '../nw/menu';

export default {
  name: 'app-menu',

  initialize: function(container, application) {
    application.register('nw:menu', AppMenu, { singleton: true });

    application.inject('controller', 'menu', 'nw:menu');
    application.inject('component',  'menu', 'nw:menu');
    application.inject('route',      'menu', 'nw:menu');
  }
};
