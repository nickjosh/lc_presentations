/* gulpfule.js
 * Build system for this presentation
 */


var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var jadeGlobbing  = require('gulp-jade-globbing');
var jade = require('gulp-jade');
var jade_compiler = require('jade');
var debug = require('gulp-debug');

jade_compiler.filters.code = function( block ) {
    return block
        .replace( /&/g, '&amp;'  )
        .replace( /</g, '&lt;'   )
        .replace( />/g, '&gt;'   )
        .replace( /"/g, '&quot;' )
        .replace( /#/g, '&#35;'  );
}

var paths = {
  jade: "index.jade",
  images: "./images/*",
  scripts: [
    "./bower_components/Flowtime.js/js/brav1toolbox.js",
    "./bower_components/Flowtime.js/js/flowtime.js",
    "./bower_components/prism/prism.js",
    "./scripts/index.js"
  ],
  css: [
    "./styles/*.css",
    "./bower_components/Flowtime.js/css/flowtime.css",
    "./bower_components/Flowtime.js/css/themes/default.css",
    "./bower_components/prism/themes/prism-twilight.css"
  ],
  fonts: [
    "./bower_components/Flowtime.js/assets/fonts/*.woff",
    "./bower_components/Flowtime.js/assets/fonts/*.tff"
  ],
}

gulp.task('fonts', function() {
  gulp.src(paths.fonts)
    .pipe(gulp.dest('./dist/assets/fonts'))
});

gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(debug({title: 'images:'}))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('css', function() {
  gulp.src(paths.css)
    .pipe(gulp.dest('./dist/styles'))
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(uglify())
    //.pipe(concat('script.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('jade', ['scripts', 'css'], function(){
  var sources = gulp.src(['./dist/scripts/*.js', './dist/styles/*.css'], {read: false});
  gulp.src([paths.jade])
      .pipe(jadeGlobbing())
      .pipe(jade({jade: jade_compiler, pretty: true}))
      .pipe(inject(sources, {ignorePath: 'dist', relative: true}))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('dist'));
});

gulp.task('default', ['images', 'jade', 'fonts']);
