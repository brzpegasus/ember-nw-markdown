import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:document', 'Unit - Document Controller');

test("#fileHandle() should display the name of the file if it exists", function(assert) {
  assert.expect(1);

  var controller = this.subject({
    model: {
      filename: '/path/to/file.md'
    }
  });

  assert.equal(controller.get('fileHandle'), '/path/to/file.md', "filename is returned");
});

test("#fileHandle() should display a placeholder text if the file has no name", function(assert) {
  assert.expect(1);
  assert.equal(this.subject().get('fileHandle'), 'New Document', "placeholder text is returned");
});
