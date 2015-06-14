import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';

var run = Ember.run;

moduleForComponent('input-file-open', 'Unit - Input File Open Component', {
  needs: ['service:nw']
});

test("should open a file dialog when the 'File - Open' menu is selected", function(assert) {
  assert.expect(1);

  var component = this.subject();
  var openFileDialog = sinon.stub(component, 'openFileDialog');

  this.render();

  var nw = component.get('nw');
  run(nw, 'trigger', 'fileOpen');
  assert.ok(openFileDialog.called, "the file dialog is open");

  openFileDialog.restore();
});

test("should trigger the primary action when the input is changed", function(assert) {
  assert.expect(1);

  var component = this.subject({
    action: 'open',
    targetObject: {
      open: Ember.K
    }
  });

  var action = sinon.stub(component.get('targetObject'), 'open');

  this.render();
  this.$().change();
  assert.ok(action.called, "action was called");

  action.restore();
});

test("should trigger the primary action when the 'File > New' menu is selected", function(assert) {
  assert.expect(1);

  var component = this.subject({
    action: 'open',
    targetObject: {
      open: Ember.K
    }
  });

  var action = sinon.stub(component.get('targetObject'), 'open');

  var nw = component.get('nw');
  run(nw, 'trigger', 'fileNew');
  assert.ok(action.called, "action was called");

  action.restore();
});
