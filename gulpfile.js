const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const del = require("del");
const browserSync = require('browser-sync');
const babel = require("gulp-babel");
const ejs = require('gulp-ejs');

gulp.task('default', (done) => {
  console.log('complete');
  done();
});

gulp.task('clean', (callback) => {
  return del(['./dist'], callback);
});

gulp.task('publicClean', () => {
  return del(['./public']);
});

gulp.task('publicCopy', () => {
  return gulp.src('./dist/**/*')
    .pipe(gulp.dest('./public'))
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
    .pipe(ejs())
    .pipe(rename({extname:'.html'})) 
    .pipe(gulp.dest('./dist'));
})

gulp.task('image', () => {
  return gulp.src('./assets/**/*.+(jpg|png|gif|svg|ico)')
    .pipe(gulp.dest('./dist'))
});

// gulp.task('babel', () => {
//   return gulp.src('./assets/**/*.js')
//     .pipe(plumber({
//       errorHandler: function(err) {
//         console.log(err.messageFormatted);
//         this.emit('end');
//       }
//     }))
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     .pipe(gulp.dest('./dist'))
// })

// babelを動かすとjsが消えてしまう？ので一時的に止めてjsをそのままにしておく
gulp.task('js', () => {
  return gulp.src('./assets/**/*.js')
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
    .pipe(sass({
      outputStyle: 'expanded'// Minifyするなら'compressed'
    }))
    .pipe(autoprefixer({
      remove: false,
      grid: 'autoplace', //gridレイアウトのプレフィックスを有効にする
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', gulp.parallel('html', 'image', 'scss', 'js', 'ejs', (callback) => {
  console.log('finish')
  callback();
}));

gulp.task('cleanBuild', gulp.series('clean', 'build'));

gulp.task('release',
  gulp.series(
    'build',
    'publicClean',
    'publicCopy',
  )
);

gulp.task('browser-sync', () => {
  return browserSync.init({
    server: {
      baseDir: './dist/'
    },
    ghostMode: false,
    // open: 'external', // ipアドレスで開く
  });
});

gulp.task('bs-reload', (done) => {
  browserSync.reload();
  done();
});

gulp.task('watch', (done) => {
  gulp.watch('assets/**/*.scss', gulp.series('scss', 'bs-reload'));
  gulp.watch('assets/**/*.+(jpg|png|gif|svg|ico)', gulp.series('image', 'bs-reload'));
  gulp.watch('assets/**/*.html', gulp.series('html', 'bs-reload'));
  gulp.watch('assets/**/*.ejs', gulp.series('ejs', 'bs-reload'));
  gulp.watch('assets/**/*.js', gulp.series('js', 'bs-reload'));
  done();
});

gulp.task('start',
  gulp.series(
    'cleanBuild',
    gulp.parallel(
      'browser-sync',
      'watch',
    )
  )
);
