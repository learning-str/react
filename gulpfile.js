const browserSync = require('browser-sync').create()
const del = require('del')
const gulp = require('gulp')
const gulpSequence = require('gulp-sequence')

// BrowserSync

gulp.task('browser-sync', () => {
  browserSync.init({
    server: './build',
    port: 5000,
    notify: false,
    browser: 'google chrome',
  })
})

// Clean

gulp.task('clean', () => {
  return del('./build/*')
})

// Build

gulp.task('build:html', () => {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream())
})

gulp.task('build:js', () => {
  gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream())
})

gulp.task('build:css', () => {
  gulp.src('./src/css/**/*.css')
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
})

// Watch

gulp.task('watch', () => {
  gulp.watch('./src/*.html', ['build:html'])
  gulp.watch('./src/js/**/*', ['build:js'])
  gulp.watch('./src/css/**/*', ['build:css'])
})

// Tasks

gulp.task('build', gulpSequence(
  'clean',
  [
    'build:html',
    'build:js',
    'build:css',
  ]
))

gulp.task('start', gulpSequence(
  'build',
  'browser-sync',
  'watch',
))
