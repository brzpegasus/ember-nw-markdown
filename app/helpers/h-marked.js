import Ember from 'ember';

/* global marked, hljs */
marked.setOptions({
  highlight: function(content) {
    return '<div class="hljs">' + hljs.highlightAuto(content).value + '</div>';
  }
});

var isNone = Ember.isNone;
var htmlSafe = Ember.String.htmlSafe;

export default Ember.HTMLBars.makeBoundHelper(function(params) {
  if (params.length === 0 || isNone(params[0])) {
    return '';
  }

  var content = marked.apply(this, params);
  return htmlSafe(content);
});
