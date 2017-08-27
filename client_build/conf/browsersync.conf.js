const conf = require('./gulp.conf');

module.exports = function () {
  return {
    //snippetOptions: {
    //  blacklist: ["/"]
    //},
    //server: {
    //  baseDir: [
    //    conf.paths.tmp,
    //    conf.paths.src
    //  ]
    //},
    proxy: {
      target: "http://localhost:5000/",
    //middleware: [
    //    function (req, res, next) {
    //        /** First middleware handler **/
    //      console.log(req.url);
    //      next();
    //    }
    //]
    },

    open: false
  };
};
