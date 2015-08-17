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

},{"./assertions.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9hc3NlcnRpb25zLmpzIiwibGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBnZXRBbHQgPSBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhbHQnKTtcclxufTtcclxuXHJcbnZhciBpc0ludGVyYWN0aXZlID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gIHJldHVybiAoe1xyXG4gICAgJ0JVVFRPTic6IHRydWUsXHJcbiAgICAnSU5QVVQnOiB0cnVlLFxyXG4gICAgJ1RFWFRBUkVBJzogdHJ1ZSxcclxuICAgICdTRUxFQ1QnOiB0cnVlLFxyXG4gICAgJ09QVElPTic6IHRydWUsXHJcbiAgfSlbZWxlbWVudC5ub2RlTmFtZV07XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFt7XHJcbiAgZm9yOiAnSU1HJyxcclxuICBtZXNzYWdlOiAnWW91IGZvcmdvdCBhbiBgYWx0YCBET00gcHJvcGVydHkgb24gYW4gaW1hZ2UuIFNjcmVlbi1yZWFkZXIgdXNlcnMgd2lsbCBub3Qga25vdyB3aGF0IGl0IGlzLicsXHJcbiAgdGVzdDogZ2V0QWx0XHJcbn0sIHtcclxuICBmb3I6ICdJTUcnLFxyXG4gIG1lc3NhZ2U6ICdTY3JlZW4tcmVhZGVycyBhbHJlYWR5IGFubm91bmNlIGBpbWdgIHRhZ3MgYXMgYW4gaW1hZ2UsIHlvdSBkb25cXCd0IG5lZWQgdG8gdXNlIHRoZSB3b3JkIFwiaW1hZ2VcIiBpbiB0aGUgZGVzY3JpcHRpb24nLFxyXG4gIHRlc3Q6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgIHJldHVybiAhKGdldEFsdChlbGVtZW50KSAmJiBnZXRBbHQoZWxlbWVudCkgPT0gJ2ltYWdlJyk7XHJcbiAgfVxyXG59LCB7XHJcbiAgZm9yOiAnYWxsJyxcclxuICBtZXNzYWdlOiAnWW91IGhhdmUgYW4gdW5sYWJsZWQgZWxlbWVudCBvciBjb250cm9sLiBBZGQgYGFyaWEtbGFiZWxgIG9yIGBhcmlhLWxhYmVsbGVkLWJ5YCBhdHRyaWJ1dGUsIG9yIHB1dCBzb21lIHRleHQgaW4gdGhlIGVsZW1lbnQuJyxcclxuICB0ZXN0OiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICBpZiAoaXNJbnRlcmFjdGl2ZShlbGVtZW50KSB8fCAoZWxlbWVudC5ub2RlTmFtZSA9PSAnQScgJiYgIWVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJykpIHx8IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyb2xlJykpXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykgfHwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWQtYnknKSkgfHxcclxuICAgICAgICAoZWxlbWVudC5ub2RlTmFtZSA9PSAnSU1HJyAmJiBnZXRBbHQoZWxlbWVudCkpIHx8XHJcbiAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudFxyXG4gICAgICApO1xyXG4gICAgZWxzZVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn0sIHtcclxuICBmb3I6ICdBJyxcclxuICBtZXNzYWdlOiAnWW91IGhhdmUgYW4gYW5jaG9yIHdpdGggYGhyZWY9XCIjXCJgIGFuZCBubyBgcm9sZWAgRE9NIHByb3BlcnR5LiBBZGQgYHJvbGU9XCJidXR0b25cImAgb3IgYmV0dGVyIHlldCwgdXNlIGEgYDxidXR0b24vPmAuJyxcclxuICB0ZXN0OiBmdW5jdGlvbihlbGVtZW50KXtcclxuICAgIHJldHVybiAhKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJykgPT0gJyMnICYmICFlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpKTtcclxuICB9XHJcbn0sIHtcclxuICBmb3I6ICdBJyxcclxuICBtZXNzYWdlOiAnWW91IGhhdmUgYW4gYW5jaG9yIHdpdGggYSB0YWJJbmRleCwgbm8gYGhyZWZgIGFuZCBubyBgcm9sZWAgRE9NIHByb3BlcnR5LiBBZGQgYHJvbGU9XCJidXR0b25cImAgb3IgYmV0dGVyIHlldCwgdXNlIGEgYDxidXR0b24vPmAuJyxcclxuICB0ZXN0OiBmdW5jdGlvbihlbGVtZW50KXtcclxuICAgIHJldHVybiAhKCFlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0YWJJbmRleCcpICYmICFlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcclxuICB9XHJcbn0sIHtcclxuICBmb3I6ICdldmVudCcsXHJcbiAgbWVzc2FnZTogJ1lvdSBoYXZlIGEgY2xpY2sgaGFuZGxlciBvbiBhIG5vbi1pbnRlcmFjdGl2ZSBlbGVtZW50IGJ1dCBubyBgcm9sZWAgRE9NIHByb3BlcnR5LiBJdCB3aWxsIGJlIHVuY2xlYXIgd2hhdCB0aGlzIGVsZW1lbnQgaXMgc3VwcG9zZWQgdG8gZG8gdG8gYSBzY3JlZW4tcmVhZGVyIHVzZXIuIGh0dHA6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhL3JvbGVzI3JvbGVfZGVmaW5pdGlvbnMnLFxyXG4gIHRlc3Q6IGZ1bmN0aW9uKGVsZW1lbnQpe1xyXG4gICAgaWYoKGVsZW1lbnQuX3JhY3RpdmV8fHtjbGljazpmYWxzZX0pLmV2ZW50cy5jbGljaylcclxuICAgICAgcmV0dXJuICEoIWlzSW50ZXJhY3RpdmUoZWxlbWVudCkgJiYgIWVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyb2xlJykpXHJcbiAgICBlbHNlXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufSwge1xyXG4gIGZvcjogJ2V2ZW50JyxcclxuICBtZXNzYWdlOiAnWW91IGhhdmUgYSBjbGljayBoYW5kbGVyIG9uIGEgbm9uLWludGVyYWN0aXZlIGVsZW1lbnQgYnV0IG5vIGB0YWJJbmRleGAgRE9NIHByb3BlcnR5LiBUaGUgZWxlbWVudCB3aWxsIG5vdCBiZSBuYXZpZ2FibGUgb3IgaW50ZXJhY3RpdmUgYnkga2V5Ym9hcmQgdXNlcnMuIGh0dHA6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLXByYWN0aWNlcy8jZm9jdXNfdGFiaW5kZXgnLFxyXG4gIHRlc3Q6IGZ1bmN0aW9uKGVsZW1lbnQpe1xyXG4gICAgaWYoKGVsZW1lbnQuX3JhY3RpdmV8fHtjbGljazpmYWxzZX0pLmV2ZW50cy5jbGljaylcclxuICAgICAgcmV0dXJuICEoIWlzSW50ZXJhY3RpdmUoZWxlbWVudCkgJiYgcGFyc2VJbnQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3RhYkluZGV4JykpIT1OYU4pXHJcbiAgICBlbHNlXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufSwge1xyXG4gIGZvcjogJ2V2ZW50JyxcclxuICBtZXNzYWdlOiAnWW91IGhhdmUgYHJvbGU9XCJidXR0b25cImAgYnV0IGRpZCBub3QgZGVmaW5lIGFuIGBvbktleURvd25gIGhhbmRsZXIuIEFkZCBpdCwgYW5kIGhhdmUgdGhlIFwiU3BhY2VcIiBrZXkgZG8gdGhlIHNhbWUgdGhpbmcgYXMgYW4gYG9uQ2xpY2tgIGhhbmRsZXIuJyxcclxuICB0ZXN0OiBmdW5jdGlvbihlbGVtZW50KXtcclxuICAgIGlmKChlbGVtZW50Ll9yYWN0aXZlfHx7Y2xpY2s6ZmFsc2V9KS5ldmVudHMuY2xpY2spXHJcbiAgICAgIHJldHVybiAhKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyb2xlJykgPT09ICdidXR0b24nICYmICFlbGVtZW50LmdldEF0dHJpYnV0ZSgnb25LZXlEb3duJykpO1xyXG4gICAgZWxzZVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn0sIHtcclxuICBmb3I6ICdldmVudCcsXHJcbiAgbWVzc2FnZTogJ1lvdSBoYXZlIGByb2xlPVwiYnV0dG9uXCJgIGJ1dCBkaWQgbm90IGRlZmluZSBhbiBgb25LZXlEb3duYCBoYW5kbGVyLiBBZGQgaXQsIGFuZCBoYXZlIHRoZSBcIkVudGVyXCIga2V5IGRvIHRoZSBzYW1lIHRoaW5nIGFzIGFuIGBvbkNsaWNrYCBoYW5kbGVyLicsXHJcbiAgdGVzdDogZnVuY3Rpb24oZWxlbWVudCl7XHJcbiAgICBpZigoZWxlbWVudC5fcmFjdGl2ZXx8e2NsaWNrOmZhbHNlfSkuZXZlbnRzLmNsaWNrKVxyXG4gICAgICByZXR1cm4gIShlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpID09PSAnYnV0dG9uJyAmJiAhZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ29uS2V5RG93bicpKTtcclxuICAgIGVsc2VcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59LCB7XHJcbiAgZm9yOiAnZXZlbnQnLFxyXG4gIG1lc3NhZ2U6ICdZb3UgaGF2ZSBgYXJpYS1oaWRkZW49XCJ0cnVlXCJgIGFwcGxpZWQgdG8gYW4gaW50ZXJhY3RpdmUgZWxlbWVudCBidXQgaGF2ZSBub3QgcmVtb3ZlZCBpdCBmcm9tIHRoZSB0YWIgZmxvdy4gVGhpcyBjb3VsZCByZXN1bHQgaW4gYSBoaWRkZW4gdGFiIHN0b3AgZm9yIHVzZXJzIG9mIHNjcmVlbiByZWFkZXJzLicsXHJcbiAgdGVzdDogZnVuY3Rpb24oZWxlbWVudCl7XHJcbiAgICBpZigoZWxlbWVudC5fcmFjdGl2ZXx8e2NsaWNrOmZhbHNlfSkuZXZlbnRzLmNsaWNrKVxyXG4gICAgICByZXR1cm4gIShcclxuICAgICAgICAgIChpc0ludGVyYWN0aXZlKGVsZW1lbnQpIHx8IChlbGVtZW50Lm5vZGVOYW1lID09ICdBJyAmJiAhZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkpICYmXHJcbiAgICAgICAgICBlbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKSA9PSAndHJ1ZScgJiZcclxuICAgICAgICAgIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0YWJJbmRleCcpICE9ICctMSdcclxuICAgICAgICApO1xyXG4gICAgZWxzZVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1dO1xyXG4iLCIoZnVuY3Rpb24oUmFjdGl2ZSkge1xyXG4gIFJhY3RpdmUucHJvdG90eXBlLmNoZWNrYTExeSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgY2hlY2tFbGVtZW50KHNlbGYuZWwpO1xyXG4gIH1cclxuXHJcbiAgdmFyIGFzc2VydGlvbnMgPSByZXF1aXJlKCcuL2Fzc2VydGlvbnMuanMnKTtcclxuXHJcbiAgdmFyIGNoZWNrRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgIGVsZW1lbnQgPSBBcnJheS5pc0FycmF5KGVsZW1lbnQpP2VsZW1lbnRbMF06ZWxlbWVudDtcclxuICAgIGFzc2VydGlvbnMuZmlsdGVyKGZ1bmN0aW9uKGFzc2VydGlvbikge1xyXG4gICAgICByZXR1cm4gYXNzZXJ0aW9uLmZvciA9PSBlbGVtZW50Lm5vZGVOYW1lIHx8IGFzc2VydGlvbi5mb3IgPT0gJ2FsbCcgfHwgKGFzc2VydGlvbi5mb3IgPT0gJ2V2ZW50JyAmJiBPYmplY3Qua2V5cygoZWxlbWVudC5fcmFjdGl2ZXx8e2V2ZW50czpbXX0pLmV2ZW50cykubGVuZ3RoKTtcclxuICAgIH0pLmZpbHRlcihmdW5jdGlvbihhc3NlcnRpb24pIHtcclxuICAgICAgcmV0dXJuICFhc3NlcnRpb24udGVzdChlbGVtZW50KTtcclxuICAgIH0pLmZvckVhY2goZnVuY3Rpb24oYXNzZXJ0aW9uKSB7XHJcbiAgICAgIGNvbnNvbGUud2Fybihhc3NlcnRpb24ubWVzc2FnZSk7XHJcbiAgICB9KTtcclxuICAgIFtdLnNsaWNlLmNhbGwoZWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChjaGVja0VsZW1lbnQpO1xyXG4gIH07XHJcblxyXG59KShSYWN0aXZlKTtcclxuIl19
