// require modules
var gulp = require('gulp'),
    // minifies js
    uglify = require('gulp-uglify'),
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

// minify javascripts & output to js folder
gulp.task('scripts', function() {
  gulp.src('js/*.js')
  .pipe(plumber())
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('js/'));
})

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
  gulp.watch('js/*.js', ['scripts']);
});

// default task
gulp.task('do', ['scripts', 'sass', 'watchthis', 'reload']);