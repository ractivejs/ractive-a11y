(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var getAlt = function(element) {
  return element.getAttribute('alt');
};

var isInteractive = function(element) {
  return ({
    'BUTTON': true,
    'INPUT': true,
    'TEXTAREA': true,
    'SELECT': true,
    'OPTION': true,
  })[element.nodeName];
};

module.exports = [{
  for: 'IMG',
  message: 'You forgot an `alt` DOM property on an image. Screen-reader users will not know what it is.',
  test: getAlt
}, {
  for: 'IMG',
  message: 'Screen-readers already announce `img` tags as an image, you don\'t need to use the word "image" in the description',
  test: function(element) {
    return !(getAlt(element) && getAlt(element) == 'image');
  }
}, {
  for: 'all',
  message: 'You have an unlabled element or control. Add `aria-label` or `aria-labelled-by` attribute, or put some text in the element.',
  test: function(element) {
    if (isInteractive(element) || (element.nodeName == 'A' && !element.getAttribute('href')) || element.getAttribute('role'))
      return (
        (element.getAttribute('aria-label') || element.getAttribute('aria-labelled-by')) ||
        (element.nodeName == 'IMG' && getAlt(element)) ||
        element.textContent
      );
    else
      return true;
  }
}, {
  for: 'A',
  message: 'You have an anchor with `href="#"` and no `role` DOM property. Add `role="button"` or better yet, use a `<button/>`.',
  test: function(element){
    return !(element.getAttribute('href') == '#' && !element.getAttribute('role'));
  }
}, {
  for: 'A',
  message: 'You have an anchor with a tabIndex, no `href` and no `role` DOM property. Add `role="button"` or better yet, use a `<button/>`.',
  test: function(element){
    return !(!element.getAttribute('role') && element.getAttribute('tabIndex') && !element.getAttribute('href'));
  }
}, {
  for: 'event',
  message: 'You have a click handler on a non-interactive element but no `role` DOM property. It will be unclear what this element is supposed to do to a screen-reader user. http://www.w3.org/TR/wai-aria/roles#role_definitions',
  test: function(element){
    if((element._ractive||{click:false}).events.click)
      return !(!isInteractive(element) && !element.getAttribute('role'))
    else
      return true;
  }
}, {
  for: 'event',
  message: 'You have a click handler on a non-interactive element but no `tabIndex` DOM property. The element will not be navigable or interactive by keyboard users. http://www.w3.org/TR/wai-aria-practices/#focus_tabindex',
  test: function(element){
    if((element._ractive||{click:false}).events.click)
      return !(!isInteractive(element) && parseInt(element.getAttribute('tabIndex'))!=NaN)
    else
      return true;
  }
}, {
  for: 'event',
  message: 'You have `role="button"` but did not define an `onKeyDown` handler. Add it, and have the "Space" key do the same thing as an `onClick` handler.',
  test: function(element){
    if((element._ractive||{click:false}).events.click)
      return !(element.getAttribute('role') === 'button' && !element.getAttribute('onKeyDown'));
    else
      return true;
  }
}, {
  for: 'event',
  message: 'You have `role="button"` but did not define an `onKeyDown` handler. Add it, and have the "Enter" key do the same thing as an `onClick` handler.',
  test: function(element){
    if((element._ractive||{click:false}).events.click)
      return !(element.getAttribute('role') === 'button' && !element.getAttribute('onKeyDown'));
    else
      return true;
  }
}, {
  for: 'event',
  message: 'You have `aria-hidden="true"` applied to an interactive element but have not removed it from the tab flow. This could result in a hidden tab stop for users of screen readers.',
  test: function(element){
    if((element._ractive||{click:false}).events.click)
      return !(
          (isInteractive(element) || (element.nodeName == 'A' && !element.getAttribute('href'))) &&
          element.getAttribute('aria-hidden') == 'true' &&
          element.getAttribute('tabIndex') != '-1'
        );
    else
      return true;
  }
}];

},{}],2:[function(require,module,exports){
(function(Ractive) {
  Ractive.prototype.checka11y = function() {
    var self = this;
    checkElement(self.el);
  }

  var assertions = require('./assertions.js');

  var checkElement = function(element) {
    assertions.filter(function(assertion) {
      return assertion.for == element.nodeName || assertion.for == 'all' || (assertion.for == 'event' && Object.keys((element._ractive||{events:[]}).events).length);
    }).filter(function(assertion) {
      return !assertion.test(element);
    }).forEach(function(assertion) {
      console.warn(assertion.message);
    });
    [].slice.call(element.children).forEach(checkElement)
  };

})(Ractive);

},{"./assertions.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9hc3NlcnRpb25zLmpzIiwibGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZ2V0QWx0ID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FsdCcpO1xufTtcblxudmFyIGlzSW50ZXJhY3RpdmUgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gIHJldHVybiAoe1xuICAgICdCVVRUT04nOiB0cnVlLFxuICAgICdJTlBVVCc6IHRydWUsXG4gICAgJ1RFWFRBUkVBJzogdHJ1ZSxcbiAgICAnU0VMRUNUJzogdHJ1ZSxcbiAgICAnT1BUSU9OJzogdHJ1ZSxcbiAgfSlbZWxlbWVudC5ub2RlTmFtZV07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFt7XG4gIGZvcjogJ0lNRycsXG4gIG1lc3NhZ2U6ICdZb3UgZm9yZ290IGFuIGBhbHRgIERPTSBwcm9wZXJ0eSBvbiBhbiBpbWFnZS4gU2NyZWVuLXJlYWRlciB1c2VycyB3aWxsIG5vdCBrbm93IHdoYXQgaXQgaXMuJyxcbiAgdGVzdDogZ2V0QWx0XG59LCB7XG4gIGZvcjogJ0lNRycsXG4gIG1lc3NhZ2U6ICdTY3JlZW4tcmVhZGVycyBhbHJlYWR5IGFubm91bmNlIGBpbWdgIHRhZ3MgYXMgYW4gaW1hZ2UsIHlvdSBkb25cXCd0IG5lZWQgdG8gdXNlIHRoZSB3b3JkIFwiaW1hZ2VcIiBpbiB0aGUgZGVzY3JpcHRpb24nLFxuICB0ZXN0OiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgcmV0dXJuICEoZ2V0QWx0KGVsZW1lbnQpICYmIGdldEFsdChlbGVtZW50KSA9PSAnaW1hZ2UnKTtcbiAgfVxufSwge1xuICBmb3I6ICdhbGwnLFxuICBtZXNzYWdlOiAnWW91IGhhdmUgYW4gdW5sYWJsZWQgZWxlbWVudCBvciBjb250cm9sLiBBZGQgYGFyaWEtbGFiZWxgIG9yIGBhcmlhLWxhYmVsbGVkLWJ5YCBhdHRyaWJ1dGUsIG9yIHB1dCBzb21lIHRleHQgaW4gdGhlIGVsZW1lbnQuJyxcbiAgdGVzdDogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIGlmIChpc0ludGVyYWN0aXZlKGVsZW1lbnQpIHx8IChlbGVtZW50Lm5vZGVOYW1lID09ICdBJyAmJiAhZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkgfHwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSlcbiAgICAgIHJldHVybiAoXG4gICAgICAgIChlbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpIHx8IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkLWJ5JykpIHx8XG4gICAgICAgIChlbGVtZW50Lm5vZGVOYW1lID09ICdJTUcnICYmIGdldEFsdChlbGVtZW50KSkgfHxcbiAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudFxuICAgICAgKTtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufSwge1xuICBmb3I6ICdBJyxcbiAgbWVzc2FnZTogJ1lvdSBoYXZlIGFuIGFuY2hvciB3aXRoIGBocmVmPVwiI1wiYCBhbmQgbm8gYHJvbGVgIERPTSBwcm9wZXJ0eS4gQWRkIGByb2xlPVwiYnV0dG9uXCJgIG9yIGJldHRlciB5ZXQsIHVzZSBhIGA8YnV0dG9uLz5gLicsXG4gIHRlc3Q6IGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgIHJldHVybiAhKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJykgPT0gJyMnICYmICFlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpKTtcbiAgfVxufSwge1xuICBmb3I6ICdBJyxcbiAgbWVzc2FnZTogJ1lvdSBoYXZlIGFuIGFuY2hvciB3aXRoIGEgdGFiSW5kZXgsIG5vIGBocmVmYCBhbmQgbm8gYHJvbGVgIERPTSBwcm9wZXJ0eS4gQWRkIGByb2xlPVwiYnV0dG9uXCJgIG9yIGJldHRlciB5ZXQsIHVzZSBhIGA8YnV0dG9uLz5gLicsXG4gIHRlc3Q6IGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgIHJldHVybiAhKCFlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0YWJJbmRleCcpICYmICFlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcbiAgfVxufSwge1xuICBmb3I6ICdldmVudCcsXG4gIG1lc3NhZ2U6ICdZb3UgaGF2ZSBhIGNsaWNrIGhhbmRsZXIgb24gYSBub24taW50ZXJhY3RpdmUgZWxlbWVudCBidXQgbm8gYHJvbGVgIERPTSBwcm9wZXJ0eS4gSXQgd2lsbCBiZSB1bmNsZWFyIHdoYXQgdGhpcyBlbGVtZW50IGlzIHN1cHBvc2VkIHRvIGRvIHRvIGEgc2NyZWVuLXJlYWRlciB1c2VyLiBodHRwOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS9yb2xlcyNyb2xlX2RlZmluaXRpb25zJyxcbiAgdGVzdDogZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgaWYoKGVsZW1lbnQuX3JhY3RpdmV8fHtjbGljazpmYWxzZX0pLmV2ZW50cy5jbGljaylcbiAgICAgIHJldHVybiAhKCFpc0ludGVyYWN0aXZlKGVsZW1lbnQpICYmICFlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpKVxuICAgIGVsc2VcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG59LCB7XG4gIGZvcjogJ2V2ZW50JyxcbiAgbWVzc2FnZTogJ1lvdSBoYXZlIGEgY2xpY2sgaGFuZGxlciBvbiBhIG5vbi1pbnRlcmFjdGl2ZSBlbGVtZW50IGJ1dCBubyBgdGFiSW5kZXhgIERPTSBwcm9wZXJ0eS4gVGhlIGVsZW1lbnQgd2lsbCBub3QgYmUgbmF2aWdhYmxlIG9yIGludGVyYWN0aXZlIGJ5IGtleWJvYXJkIHVzZXJzLiBodHRwOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS1wcmFjdGljZXMvI2ZvY3VzX3RhYmluZGV4JyxcbiAgdGVzdDogZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgaWYoKGVsZW1lbnQuX3JhY3RpdmV8fHtjbGljazpmYWxzZX0pLmV2ZW50cy5jbGljaylcbiAgICAgIHJldHVybiAhKCFpc0ludGVyYWN0aXZlKGVsZW1lbnQpICYmIHBhcnNlSW50KGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0YWJJbmRleCcpKSE9TmFOKVxuICAgIGVsc2VcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG59LCB7XG4gIGZvcjogJ2V2ZW50JyxcbiAgbWVzc2FnZTogJ1lvdSBoYXZlIGByb2xlPVwiYnV0dG9uXCJgIGJ1dCBkaWQgbm90IGRlZmluZSBhbiBgb25LZXlEb3duYCBoYW5kbGVyLiBBZGQgaXQsIGFuZCBoYXZlIHRoZSBcIlNwYWNlXCIga2V5IGRvIHRoZSBzYW1lIHRoaW5nIGFzIGFuIGBvbkNsaWNrYCBoYW5kbGVyLicsXG4gIHRlc3Q6IGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgIGlmKChlbGVtZW50Ll9yYWN0aXZlfHx7Y2xpY2s6ZmFsc2V9KS5ldmVudHMuY2xpY2spXG4gICAgICByZXR1cm4gIShlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpID09PSAnYnV0dG9uJyAmJiAhZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ29uS2V5RG93bicpKTtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufSwge1xuICBmb3I6ICdldmVudCcsXG4gIG1lc3NhZ2U6ICdZb3UgaGF2ZSBgcm9sZT1cImJ1dHRvblwiYCBidXQgZGlkIG5vdCBkZWZpbmUgYW4gYG9uS2V5RG93bmAgaGFuZGxlci4gQWRkIGl0LCBhbmQgaGF2ZSB0aGUgXCJFbnRlclwiIGtleSBkbyB0aGUgc2FtZSB0aGluZyBhcyBhbiBgb25DbGlja2AgaGFuZGxlci4nLFxuICB0ZXN0OiBmdW5jdGlvbihlbGVtZW50KXtcbiAgICBpZigoZWxlbWVudC5fcmFjdGl2ZXx8e2NsaWNrOmZhbHNlfSkuZXZlbnRzLmNsaWNrKVxuICAgICAgcmV0dXJuICEoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSA9PT0gJ2J1dHRvbicgJiYgIWVsZW1lbnQuZ2V0QXR0cmlidXRlKCdvbktleURvd24nKSk7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbn0sIHtcbiAgZm9yOiAnZXZlbnQnLFxuICBtZXNzYWdlOiAnWW91IGhhdmUgYGFyaWEtaGlkZGVuPVwidHJ1ZVwiYCBhcHBsaWVkIHRvIGFuIGludGVyYWN0aXZlIGVsZW1lbnQgYnV0IGhhdmUgbm90IHJlbW92ZWQgaXQgZnJvbSB0aGUgdGFiIGZsb3cuIFRoaXMgY291bGQgcmVzdWx0IGluIGEgaGlkZGVuIHRhYiBzdG9wIGZvciB1c2VycyBvZiBzY3JlZW4gcmVhZGVycy4nLFxuICB0ZXN0OiBmdW5jdGlvbihlbGVtZW50KXtcbiAgICBpZigoZWxlbWVudC5fcmFjdGl2ZXx8e2NsaWNrOmZhbHNlfSkuZXZlbnRzLmNsaWNrKVxuICAgICAgcmV0dXJuICEoXG4gICAgICAgICAgKGlzSW50ZXJhY3RpdmUoZWxlbWVudCkgfHwgKGVsZW1lbnQubm9kZU5hbWUgPT0gJ0EnICYmICFlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpKSkgJiZcbiAgICAgICAgICBlbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKSA9PSAndHJ1ZScgJiZcbiAgICAgICAgICBlbGVtZW50LmdldEF0dHJpYnV0ZSgndGFiSW5kZXgnKSAhPSAnLTEnXG4gICAgICAgICk7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbn1dO1xuIiwiKGZ1bmN0aW9uKFJhY3RpdmUpIHtcbiAgUmFjdGl2ZS5wcm90b3R5cGUuY2hlY2thMTF5ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGNoZWNrRWxlbWVudChzZWxmLmVsKTtcbiAgfVxuXG4gIHZhciBhc3NlcnRpb25zID0gcmVxdWlyZSgnLi9hc3NlcnRpb25zLmpzJyk7XG5cbiAgdmFyIGNoZWNrRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICBhc3NlcnRpb25zLmZpbHRlcihmdW5jdGlvbihhc3NlcnRpb24pIHtcbiAgICAgIHJldHVybiBhc3NlcnRpb24uZm9yID09IGVsZW1lbnQubm9kZU5hbWUgfHwgYXNzZXJ0aW9uLmZvciA9PSAnYWxsJyB8fCAoYXNzZXJ0aW9uLmZvciA9PSAnZXZlbnQnICYmIE9iamVjdC5rZXlzKChlbGVtZW50Ll9yYWN0aXZlfHx7ZXZlbnRzOltdfSkuZXZlbnRzKS5sZW5ndGgpO1xuICAgIH0pLmZpbHRlcihmdW5jdGlvbihhc3NlcnRpb24pIHtcbiAgICAgIHJldHVybiAhYXNzZXJ0aW9uLnRlc3QoZWxlbWVudCk7XG4gICAgfSkuZm9yRWFjaChmdW5jdGlvbihhc3NlcnRpb24pIHtcbiAgICAgIGNvbnNvbGUud2Fybihhc3NlcnRpb24ubWVzc2FnZSk7XG4gICAgfSk7XG4gICAgW10uc2xpY2UuY2FsbChlbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGNoZWNrRWxlbWVudClcbiAgfTtcblxufSkoUmFjdGl2ZSk7XG4iXX0=
