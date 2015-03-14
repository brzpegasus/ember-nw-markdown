import Ember from 'ember';
import { test, module } from 'qunit';
import MenuEventHandlerMixin from '../../../mixins/menu-event-handler';

var run = Ember.run;
var subject, menu;

module('Unit - Menu Event Handler', {
  beforeEach: function() {
    var Menu = Ember.Object.extend(Ember.Evented);
    menu = Menu.create();

    var Subject = Ember.Object.extend(MenuEventHandlerMixin, {
      init: function() {
        this.set('menu', menu);
      },
      menuEvents: {
        fileOpen: Ember.K,
        fileSave: Ember.K
      }
    });

    subject = Subject.create();
  },

  afterEach: function() {
    run(menu, 'destroy');
  }
});

test("should register menu event handlers on init", function(assert) {
  assert.expect(2);

  assert.ok(menu.has('fileOpen'), "has subscription for fileOpen event");
  assert.ok(menu.has('fileSave'), "has subscription for fileSave event");
});

test("should unregister menu event handlers on destroy", function(assert) {
  assert.expect(2);

  run(subject, 'destroy');
  assert.equal(menu.has('fileOpen'), false, "has no subscription for fileOpen event");
  assert.equal(menu.has('fileSave'), false, "has no subscription for fileSave event");
});
