var emberCLI = window.global.require.resolve('ember-cli');
var tokens = emberCLI.split('node_modules');

export default tokens[0];
