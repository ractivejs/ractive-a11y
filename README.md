# ractive-a11y

###Usage:
Include script:
```html
<script src='https://rawgit.com/ractivejs/ractive-a11y/master/dist/build.js' type='text/javascript'></script>
```
Run on render:
```javascript
onrender:function(){
  this.checka11y();
}
```
Reports will be printed in the console.


*Got questions? Tag Stack Overflow questions with [ractivejs](http://stackoverflow.com/questions/tagged/ractivejs) or contact [@RactiveJS](http://twitter.com/RactiveJS) on Twitter*


## What is Ractive-A11y?

It's a plugin for Ractive which will automagically scan for accessibility issues.


## Get help

If you don't find what you're looking for in the [docs](http://docs.ractivejs.org/latest), ask a question in [Google Groups](https://groups.google.com/forum/#!forum/ractive-js) forum, Stack Overflow with the [`ractivejs`](http://stackoverflow.com/questions/tagged/ractivejs) tag, or send a tweet to [@RactiveJS](http://twitter.com/RactiveJS).


## Developing and building

If you want to hack on Ractive, the first step is to clone the repo and install all its development dependencies:

```bash
git clone https://github.com/ractivejs/ractive-a11y   # or your fork
cd ractive-a11y
npm install
```

To build the library:

```bash
browserify lib/index.js -o dist/build.js -d
```


## Contributing

Pull requests and issues are always welcome! Please read [CONTRIBUTING.md](https://github.com/ractivejs/ractive/blob/master/CONTRIBUTING.md) to learn how to contribute.
