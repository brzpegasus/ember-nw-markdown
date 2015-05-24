import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';

var run = Ember.run;

moduleForComponent('input-file-save', 'Unit - Input File Save Component', {
  integration: true
});

test("should open a file dialog when the 'File > Save' menu is selected, and saveAs is set", function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.set('saveAs', true);

  var clicked = false;
  component.on('click', function() {
    clicked = true;
  });

  this.render();

  var nw = component.get('nw');
  run(nw, 'trigger', 'fileSave');
  assert.ok(clicked, "click was triggered to open the file dialog");
});

test("should trigger the primary action when the 'File > Save' menu is selected, and saveAs is not set", function(assert) {
  assert.expect(1);

  var component = this.subject();

  var isActionCalled = false;
  component.set('action', 'save');
  component.set('targetObject', {
    save: function() {
      isActionCalled = true;
    }
  });

  var nw = component.get('nw');
  run(nw, 'trigger', 'fileSave');
  assert.ok(isActionCalled, "action was called");
});
