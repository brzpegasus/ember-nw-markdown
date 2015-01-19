import Ember from 'ember';
import marked from '../helpers/marked';

export default {
  name: 'marked',

  initialize: function() {
    var helper = (Ember.HTMLBars || Ember.Handlebars).helper;
    helper('marked', marked);
  }
};
