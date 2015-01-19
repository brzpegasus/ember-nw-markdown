import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  filename:      attr('string'),
  body:          attr('string'),
  isGitFlavored: attr('boolean', { defaultValue: true })
});
