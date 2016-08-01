var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    jade = require('gulp-jade');

gulp.task('test', function() {
  gulp.src('./test/app.spec.js')
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.watch('./app.js', ['test']).on('change', function() {
  console.log('Test was run.');
})

gulp.task('template', function() {
  gulp.src('./public/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public'))
});

var watcher = gulp.watch('./public/*.jade', ['template']);
watcher.on('change', function(event) {
  console.log('Jade converted');
});
