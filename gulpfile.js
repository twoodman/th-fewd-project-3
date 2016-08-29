// require modules
var gulp = require('gulp'),
    // compiles Sass & compass
    compass = require('gulp-compass'),
    // minifies css
    cleanCSS = require('gulp-clean-css'),
    // renames files
    rename = require('gulp-rename'),
    // gulp plumber so errors dont break pipe
    plumber = require('gulp-plumber'),
    // webserver & live reload
    webserver = require('gulp-webserver');

// compile Sass, minify, & output to stylesheets folder
gulp.task('sass', function() {
  gulp.src('scss/**/*.scss')
  .pipe(plumber())
  .pipe(compass({
    config_file: './config.rb',
    css: 'stylesheets',
    sass: 'scss'
  }))
  .pipe(cleanCSS())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('stylesheets/'));
});

// open & live reload webserver
gulp.task('reload', function() {
  gulp.src('./')
  .pipe(plumber())
  .pipe(webserver({
    open: true,
    auto: false,
    livereload: true
  }));
});

//  watch task
gulp.task('watchthis', function() {
  gulp.watch('scss/**/*.scss', ['sass']);
});

// default task
gulp.task('do', ['sass', 'watchthis', 'reload']);