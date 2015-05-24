import Ember from 'ember';
import { test, module } from 'qunit';
import MenuEventHandlerMixin from '../../../mixins/menu-event-handler';

var run = Ember.run;
var subject, nw;

module('Unit - Menu Event Handler', {
  beforeEach: function() {
    var NW = Ember.Object.extend(Ember.Evented);
    nw = NW.create();

    var Subject = Ember.Object.extend(MenuEventHandlerMixin, {
      init: function() {
        this.set('nw', nw);
      },
      menuEvents: {
        fileOpen: Ember.K,
        fileSave: Ember.K
      }
    });

    subject = Subject.create();
  },

  afterEach: function() {
    run(nw, 'destroy');
  }
});

test("should register menu event handlers on init", function(assert) {
  assert.expect(2);

  assert.ok(nw.has('fileOpen'), "has subscription for fileOpen event");
  assert.ok(nw.has('fileSave'), "has subscription for fileSave event");
});

test("should unregister menu event handlers on destroy", function(assert) {
  assert.expect(2);

  run(subject, 'destroy');
  assert.equal(nw.has('fileOpen'), false, "has no subscription for fileOpen event");
  assert.equal(nw.has('fileSave'), false, "has no subscription for fileSave event");
});
