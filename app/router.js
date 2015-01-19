import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('document', function() {
    this.route('edit');
    this.route('preview');
  });
});

export default Router;
