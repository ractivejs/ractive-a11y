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
  message: 'You have an anchor with a tabindex, no `href` and no `role` DOM property. Add `role="button"` or better yet, use a `<button/>`.',
  test: function(element){
    return !(!element.getAttribute('role') && element.getAttribute('tabindex') && !element.getAttribute('href'));
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
  message: 'You have a click handler on a non-interactive element but no `tabindex` DOM property. The element will not be navigable or interactive by keyboard users. http://www.w3.org/TR/wai-aria-practices/#focus_tabindex',
  test: function(element){
    if((element._ractive||{click:false}).events.click)
      return (!isInteractive(element) && parseInt(element.getAttribute('tabindex'))!=NaN)
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
          element.getAttribute('tabindex') != '-1'
        );
    else
      return true;
  }
}];
