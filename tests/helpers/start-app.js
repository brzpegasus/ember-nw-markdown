import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';

var run = Ember.run;
var RSVP = Ember.RSVP;

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs);

  run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  var container = application.__container__;
  var nwService = container.lookup('service:nw');

  nwService.set('fileUtil', {
    readFile: function() {
      return RSVP.resolve('foo bar baz');
    },
    writeFile: function() {
      return RSVP.resolve();
    }
  });

  return application;
}
