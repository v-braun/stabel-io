const path = require('path');

const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');

const conf = require('../conf/gulp.conf');

gulp.task('assets', assets);
gulp.task('clean', clean);
gulp.task('other', other);
gulp.task('borsersyncFiles', borsersyncFiles);

function clean() {
  return del([conf.paths.dist, conf.paths.tmp]);
}
function borsersyncFiles() {
  return gulp.src([
    path.join(conf.paths.src, '/vendor/browsersync.js')
  ])    
    .pipe(gulp.dest(conf.paths.dist));
}

function assets() {
  return gulp.src([
    path.join(conf.paths.src, '/assets/**'),
    path.join(conf.paths.src, '/vendor/**')
  ])
  .pipe(gulp.dest(conf.paths.dist + '/assets/'));
}

function other() {
  const fileFilter = filter(file => file.stat.isFile());

  return gulp.src([
    path.join(conf.paths.src, '/assets/favicon.ico'),
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.dist));
}
