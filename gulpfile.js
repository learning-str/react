const browserSync = require('browser-sync').create()
const del = require('del')
const gulp = require('gulp')
const gulpSequence = require('gulp-sequence')
const rollup = require('gulp-rollup')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')

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
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream())
})

gulp.task('build:js', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(rollup({
      input: './src/js/main.js',
      format: 'iife',
      plugins: [
        nodeResolve(),
        commonjs(),
        babel()
      ]
    }))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream())
})

gulp.task('build:css', () => {
  return gulp.src('./src/css/**/*.css')
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
