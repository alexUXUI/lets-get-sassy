var gulp = require("gulp")
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var babel = require('gulp-babel')
var runSequence = require('run-sequence')
var useref = require('gulp-useref')

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('sass', () => {
  return gulp.src('app/scss/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
})

gulp.task('watch', ["browserSync", "sass"], () => {
  gulp.watch('app/**/*', ["sass", 'html'], () => {
  })
})

gulp.task('html', () => {
  return gulp.src('app/index.html')
  .pipe(gulp.dest('app'))
  .pipe(browserSync.reload({
    stream: true
  }))
})

gulp.task('default', () => {
  runSequence(['sass','browserSync', 'watch'], () => {
    console.log('finishing tasks');
  })
})
