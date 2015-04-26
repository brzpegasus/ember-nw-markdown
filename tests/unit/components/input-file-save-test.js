import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';

var run = Ember.run;

moduleForComponent('input-file-save', 'Unit - Input File Save Component', {
  needs: ['service:nw']
});

test("should open a file dialog when the 'File > Save' menu is selected, and saveAs is set", function(assert) {
  assert.expect(1);

  var component = this.subject({
    saveAs: true
  });

  var openFileDialog = sinon.stub(component, 'openFileDialog');

  this.render();

  var nw = component.get('nw');
  run(nw, 'trigger', 'fileSave');
  assert.ok(openFileDialog.called, "the file dialog is open");

  openFileDialog.restore();
});

test("should trigger the primary action when the 'File > Save' menu is selected, and saveAs is not set", function(assert) {
  assert.expect(1);

  var component = this.subject({
    action: 'save',
    targetObject: {
      save: Ember.K
    }
  });

  var action = sinon.stub(component.get('targetObject'), 'save');

  var nw = component.get('nw');
  run(nw, 'trigger', 'fileSave');
  assert.ok(action.called, "action was called");

  action.restore();
});
