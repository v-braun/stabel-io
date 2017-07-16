const gulp = require('gulp');
const gutil = require('gulp-util');

const webpack = require('webpack');
const gulpConf = require('../conf/gulp.conf');
const browsersync = require('browser-sync');

const webpackConf = require('../conf/webpack.conf');
const webpackDistConf = require('../conf/webpack-dist.conf');

const chalk = require('chalk');
const info = chalk.bold.green;
const moment = require('moment');
const WindowsToaster = require('node-notifier').WindowsToaster;
var notifier = new WindowsToaster({
    withFallback: true, // Fallback to Growl or Balloons?
    customPath: void 0 // Relative/Absolute path if you want to use your fork of SnoreToast.exe
  });

gulp.task('webpack:dev', done => {
  webpackWrapper(false, webpackConf, done);
});

gulp.task('webpack:watch', done => {
  webpackWrapper(true, webpackConf, done);
});

gulp.task('webpack:dist', done => {
  process.env.NODE_ENV = 'production';
  webpackWrapper(false, webpackDistConf, done);
});

function info_msg(msg){
  
  console.log(info(`[${moment().format('HH:mm:ss')}] ${msg}`));
  notifier.notify({
    title: msg, // String. Required
    message: `at ${moment().format('HH:mm:ss')}`, // String. Required if remove is not defined    
  }, function(error, response) {
    //console.log(response);
  });  
}

function webpackWrapper(watch, conf, done) {
  const webpackBundler = webpack(conf);

  const webpackChangeHandler = (err, stats) => {
    if (err) {
      gulpConf.errorHandler('Webpack')(err);
    }
    gutil.log(stats.toString({
      colors: true,
      chunks: false,
      hash: false,
      version: false
    }));

    info_msg(`compile: done`);

    if (done) {
      done();
      done = null;
    } else {
      browsersync.reload();
    }
  };
  
  if (watch) {
    webpackBundler.plugin('watch-run', (w, done) => {
      info_msg(`compile: start`);      
      done();
    });

    webpackBundler.watch(200, webpackChangeHandler);
  } else {
    webpackBundler.run(webpackChangeHandler);
  }
}
