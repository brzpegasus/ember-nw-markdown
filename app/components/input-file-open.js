import InputFile from './input-file';

export default InputFile.extend({
  attributeBindings: ['accept'],

  accept: '.md',

  menuEvents: {
    fileOpen: function() {
      this.openFileDialog();
    }
  }
});
