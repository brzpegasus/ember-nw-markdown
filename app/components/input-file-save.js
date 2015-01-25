import InputFile from './input-file';

export default InputFile.extend({
  attributeBindings: ['nwsaveas'],

  nwsaveas: 'untitled.md',

  menuEvents: {
    fileSave: function() {
      if (this.get('saveAs')) {
        this.openFileDialog();
      } else {
        this.sendAction();
      }
    }
  }
});
