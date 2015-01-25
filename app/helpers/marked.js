import Ember from 'ember';

/* global marked, hljs */
marked.setOptions({
  highlight: function(content) {
    return '<div class="hljs">' + hljs.highlightAuto(content).value + '</div>';
  }
});

var mark;
var htmlSafe = Ember.String.htmlSafe;

if (Ember.HTMLBars) {
  mark = function mark(params) {
    if (params.length !== 1) {
      throw new TypeError('Invalid number of arguments; expected 1');
    }

    var content = marked.apply(this, params);
    return htmlSafe(content);
  };
} else {
  mark = function mark(value, options) {
    var length = arguments.length;
    var args = [value || ''];

    if (length === 1) {
      throw new TypeError('Invalid number of arguments; expected 1');
    } else if (length > 3) {
      args.push(options);
    }

    var content = marked.apply(this, args);
    return htmlSafe(content);
  };
}

export default mark;
