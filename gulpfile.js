var gulp = require('gulp');
var ts = require('gulp-typescript');
 
gulp.task('default', function () {
    return gulp.src('js/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'output.js'
        }))
        .pipe(gulp.dest('js'));
});


gulp.task('name', function() {
    //implementation of the task
    console.log('hello');
});

gulp.task('copy', function() {
    gulp.src('index.php')
    .pipe(gulp.dest('assets'))
  });