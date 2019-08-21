var gulp        = require('gulp');
var ts          = require('gulp-typescript');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var uglify      = require('gulp-uglify');
var jshint      = require( 'gulp-jshint' );
var pump        = require('pump');
var rename      = require( 'gulp-rename' );
var notify      = require( 'gulp-notify' );
var include     = require( 'gulp-include' );
var autoprefixer = require('gulp-autoprefixer');
var watch        = require( 'gulp-watch' );
var plumber      = require( 'gulp-plumber' );
var babel        = require('gulp-babel');


  // Jshint outputs any kind of javascript problems you might have
// Only checks javascript files inside /src directory
gulp.task( 'jshint', function() {
    return gulp.src( './js/src/*.js' )
      .pipe( jshint() )
      .pipe( jshint.reporter( 'fail' ) );
  })
 
// Concatenates all files that it finds in the manifest
// and creates two versions: normal and minified.
// It's dependent on the jshint task to succeed.
gulp.task( 'scripts', ['jshint'], function() {
    return gulp.src( './js/manifest.js' )
      .pipe( include() )
      .pipe( rename( { basename: 'scripts' } ) )
      .pipe( gulp.dest( './dist/js' ) )
      // Normal done, time to create the minified javascript (scripts.min.js)
      // remove the following 3 lines if you don't want it
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe( uglify() )
      .pipe( rename( { suffix: '.min' } ) )
      .pipe( gulp.dest( './dist/js' ) )
      .pipe(browserSync.reload({stream: true}))
      .pipe( notify({ message: 'scripts task complete' }));
  } );


  gulp.task('typeScripts', function () {
    return gulp.src('js/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'output.js'
        }))
        .pipe(babel({
          presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist/js'))    
        .pipe( uglify() )
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( gulp.dest( 'dist/js' ) )
        .pipe(browserSync.reload({stream: true}))
        .pipe( notify({ message: 'ts min task complete' }));
});


// automatically reloads the page when files changed
var browserSyncWatchFiles = [
    './css/*.min.css',
    './js/**/*.min.js',
    './**/*.php'
];

// see: https://www.browsersync.io/docs/options/
var browserSyncOptions = {
    watchTask: true,
    proxy: "http://localhost:8888/typeScript"
}

// Starts browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync.init(browserSyncWatchFiles, browserSyncOptions);
});

// Default error handler
var onError = function( err ) {
    console.log( 'An error occured:', err.message );
    this.emit('end');
  }
  
  // Different options for the Sass tasks
var options = {};
options.sass = {
  errLogToConsole: true,
  precision: 8,
  noCache: true,
  //imagePath: 'assets/img',
//   includePaths: [
//     config.nodeDir + '/bootstrap/scss',
//   ]
};

options.sassmin = {
  errLogToConsole: true,
  precision: 8,
  noCache: true,
  outputStyle: 'compressed',
  //imagePath: 'assets/img',
//   includePaths: [
//     config.nodeDir + '/bootstrap/scss',
//   ]
};

// Sass
gulp.task('sass', function() {
    return gulp.src('./sass/itCart.scss')
        .pipe(plumber())
        .pipe(sass(options.sass).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify({ title: 'Sass', message: 'sass task complete'  }));
});

// Sass-min - Release build minifies CSS after compiling Sass
gulp.task('sass-min', function() {
    return gulp.src('./sass/itCart.scss')
        .pipe(plumber())
        .pipe(sass(options.sassmin).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename( { suffix: '.min' } ) )
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify({ title: 'Sass', message: 'sass-min task complete' }));
});
 
 
// Start the livereload server and watch files for change
gulp.task( 'watch', function() {
 
  // don't listen to whole js folder, it'll create an infinite loop
  gulp.watch( [ './js/**/*.ts' ], [ 'typeScripts' ] );
  gulp.watch( [ './dist/js/*.js' ], [ 'scripts' ] );

  // gulp.watch( './js/**/*.*' ).on('change', browserSync.reload);

  // gulp.watch( [ './js/**/*.js', '!./js/dist/*.js' ], [ 'scripts' ] )
 
  gulp.watch( './sass/**/*.scss', ['sass', 'sass-min'] );

//   gulp.watch( './images/**/*', ['images']);
 
  gulp.watch( './**/*.php' ).on('change', browserSync.reload);
   
} );
 
 
gulp.task( 'default', ['watch', 'browser-sync'], function() {
 // Does nothing in this task, just triggers the dependent 'watch'
} );


