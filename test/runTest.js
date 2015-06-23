var Assertions = require('../lib/assertions.js');
var Tests = require('./tests.js');

Ractive.prototype.checka11y.runTests = function() {
  return Tests.map(function(test) {
    var ractive = new Ractive({el:'body',template:test.template});
    var element = ractive.el.children[0];
    Assertions.filter(function(assertion) {
      return assertion.for == element.nodeName || assertion.for == 'all' || (assertion.for == 'event' && Object.keys((element._ractive||{events:[]}).events).length);
    }).filter(function(assertion) {
      return !assertion.test(element);
    }).forEach(function(assertion){
      if(test.shouldPass)
        console.warn('Test Failed:', test.name, ' | With:', assertion.message);
    });
    return test;
  });
}
