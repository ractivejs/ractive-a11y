(function(Ractive) {
  Ractive.prototype.checka11y = function() {
    var self = this;
    checkElement(self.el);
  }

  var assertions = require('./assertions.js');

  var checkElement = function(element) {
    element = Array.isArray(element)?element[0]:element;
    assertions.filter(function(assertion) {
      return assertion.for == element.nodeName || assertion.for == 'all' || (assertion.for == 'event' && Object.keys((element._ractive||{events:[]}).events).length);
    }).filter(function(assertion) {
      return !assertion.test(element);
    }).forEach(function(assertion) {
      console.warn(assertion.message);
    });
    [].slice.call(element.children).forEach(checkElement);
  };

})(Ractive);
