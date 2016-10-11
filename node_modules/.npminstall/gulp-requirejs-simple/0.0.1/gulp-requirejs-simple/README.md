# A gulp plugin for compiling with requirejs

## Install

Install with [npm](https://npmjs.org/package/gulp-requirejs-simple).

```
npm install --save-dev gulp-requirejs-simple
```

## Examples

```js
var gulp = require('gulp');
var requirejs = require('gulp-requirejs-simple');

gulp.task('requirejs', requirejs({
    baseUrl: 'js',
    name: 'main',
    out: 'js/main.min.js',
    mainConfigFile: 'js/main.js',
    optimize: 'uglify2',
    preserveLicenseComments: false,
    generateSourceMaps: true,
    paths: {
        templates: '../../templates'
    }
}));
```
This plugin does not currently support streams. If you want to call it from within a function (rather than passing it directly as the second gulp.task parameter, you can do so like this:

```js
var gulp = require('gulp');
var requirejs = require('gulp-requirejs-simple');

gulp.task('requirejs', function(cb) {
    var config = {
        baseUrl: 'js',
        name: 'main',
        out: 'js/main.min.js',
        mainConfigFile: 'js/main.js',
        optimize: 'uglify2',
        preserveLicenseComments: false,
        generateSourceMaps: true,
        paths: {
            templates: '../../templates'
        }
    };

    requirejs(config)(cb);
});
```



## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ Josh Emerson
