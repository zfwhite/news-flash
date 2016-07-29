var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    jade = require('gulp-jade'),
    assert = require('chai').assert;

gulp.task('template', function() {
  gulp.src('./public/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public'))
});

var watcher = gulp.watch('./public/*.jade', ['template']);
watcher.on('change', function(event) {
  console.log('Jade converted');
});
