'use strict';

var 
  gulp = require('gulp'),
  browserSync = require('browser-sync'),
  jade = require('gulp-jade'),
  sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  merge = require('merge-stream'),
  cssGlobbing = require('gulp-css-globbing'),
  rename = require("gulp-rename"),
  wiredep = require('wiredep').stream,
  changed = require('gulp-changed'),
  useref = require('gulp-useref');

var paths = {
  src: {
    app : 'app',
    html : 'app/*.html',
    js : 'app/js/**/*.js',
    css : 'app/css/*.css',
    scss : 'app/sass/**/*.scss',
    jade : 'app/jade/**/*.jade',
    sprite: 'app/img/sprites/'
  },
  dest: {
    css : 'app/css',
    app : 'app/',
    scss : 'app/sass',
    img : 'app/img/'
  }
};

//Сервер
gulp.task('server', function () {
  browserSync({
    port : 9000,
    server: {
      baseDir : paths.src.app
    }
  });
});

//Слежка
gulp.task('watch', function () {
  gulp.watch([
    paths.src.html,
    paths.src.js,
    paths.src.css,
  ]).on('change', browserSync.reload);
  gulp.watch('bower.json', ['wiredep']);
  gulp.watch(paths.src.jade, ['jade']);
  gulp.watch(paths.src.scss, ['scss']);
  gulp.watch(paths.src.scss, ['scssie']);
});

//Слежка за Bower
gulp.task('wiredep', function () {
  gulp.src(paths.src.html)
    //.pipe(plumber())
    .pipe(wiredep({
      directory : "app/bower"
    }))
    .pipe(gulp.dest(paths.dest.app));
});

//jade
gulp.task('jade', function () {
     return gulp.src('app/jade/index.jade')
      .pipe(plumber())
      .pipe(jade({
          pretty: true
      }))
    .pipe(gulp.dest(paths.dest.app));
});

//scss
gulp.task('scss', function() {
  return gulp.src('app/sass/main.scss')
   .pipe(cssGlobbing({
        extensions: ['.scss']
    }))
    .pipe(sourcemaps.init())
        .pipe(sass()
            .on('error', sass.logError))
        .pipe(prefix({
          browsers: ["last 2 version", "> 1%", "ie 9", "ie 8"]
        }))
    .pipe(sourcemaps.write())
    .pipe(rename('main.css'))
    .pipe(gulp.dest(paths.dest.css));

});

gulp.task('scssie', function() {
  return gulp.src('app/sass/mainie.scss')
   .pipe(cssGlobbing({
        extensions: ['.scss']
    }))
    .pipe(sourcemaps.init())
        .pipe(sass()
            .on('error', sass.logError))
        .pipe(prefix({
          browsers: ["last 2 version", "> 1%", "ie 9", "ie 8"]
        }))
    .pipe(sourcemaps.write())
    .pipe(rename('mainie.css'))
    .pipe(gulp.dest(paths.dest.css));

});

//js
gulp.task('scripts', function() {
  return gulp.src(paths.scriptsDev + 'entry.js')
    .pipe(plumber())
    .pipe(browserify({
        debug : true
    }))
    .pipe(rename('scripts.js'))
    .pipe(gulp.dest(paths.scriptsDist));
});


gulp.task('default', ['server', 'watch']);