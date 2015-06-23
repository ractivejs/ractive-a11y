module.exports = [{
  name: 'Blank Button',
  template: '<button></button>',
  shouldPass: false
}, {
  name: 'Button',
  template: '<button>My Lovely Button</button>',
  shouldPass: true
}, {
  name: 'Blank IMG',
  template: '<img />',
  shouldPass: false
}, {
  name: 'Blank IMG',
  template: '<img alt="cat pics!" />',
  shouldPass: true
}, {
  name:'\'image\' in IMG alt',
  template: '<img alt="image" />',
  shouldPass: false
}]; //You get the idea...
