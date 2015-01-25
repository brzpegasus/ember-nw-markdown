import Ember from 'ember';
import gui from './nw/gui';

var process = window.process;

export default Ember.Object.createWithMixins({
  isNodeWebKit: Ember.computed(function() {
    return typeof window.nwDispatcher !== 'undefined';
  }),

  isMac: Ember.computed(function() {
    return process && process.platform === 'darwin';
  }),

  cmdKey: Ember.computed('isMac', function() {
    return this.get('isMac') ? 'cmd' : 'ctrl';
  }),

  appWindow: Ember.computed(function() {
    return gui && gui.Window.get();
  }),

  userHome: Ember.computed(function() {
    return process && (process.env.USERPROFILE || process.env.HOME);
  })
});
