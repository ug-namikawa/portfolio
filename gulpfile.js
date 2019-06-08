var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');
var del = require("del");
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var babel = require("gulp-babel");
var ejs = require('gulp-ejs');

gulp.task('default', () => {
  console.log('complete');
});

gulp.task('clean', (callback) => {
  return del(['dist'], callback);
});

gulp.task('build', ['clean'], (callback) => {
  return runSequence(
    ['html', 'image', 'scss', 'babel', 'ejs'],
    callback
  );
});

gulp.task('html', () => {
  return gulp.src('./assets/**/*.html')
    .pipe(gulp.dest('./dist'))
});

gulp.task('ejs', () => {
  return gulp.src('assets/**/!(_)*.ejs')
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(ejs({ msg: ''}, {}, { ext: '.html' }))
    .pipe(gulp.dest('./dist'));
})

gulp.task('image', () => {
  return gulp.src('./assets/**/*.+(jpg|png|gif|svg|ico)')
    .pipe(gulp.dest('./dist'))
});

gulp.task('babel', () => {
  return gulp.src('./assets/**/*.js')
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('scss', () => {
  return gulp.src('./assets/**/*.scss')
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 11', 'android 4'],
      remove: false
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('browser-sync', () => {
  return browserSync({
    server: {
      baseDir: './dist/'
    },
    // open: 'external',
  });
});

gulp.task('watch', ['build', 'browser-sync'], () => {
  gulp.watch('assets/**/*.scss', ['scss']);
  gulp.watch('./assets/**/*.+(jpg|png|gif|svg|ico)', ['image']);
  gulp.watch('./assets/**/*.html', ['html']);
  gulp.watch('assets/**/*.ejs', ['ejs']);
  gulp.watch('./assets/**/*.js', ['babel']);
  gulp.watch(['./dist/**/*.html', './dist/**/*.css', './dist/**/*.js', './dist/**/*.+(jpg|png|gif|svg|ico)'], () => {
    browserSync.reload();
  });
});
