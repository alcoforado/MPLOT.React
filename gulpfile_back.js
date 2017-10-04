const gulp = require('gulp');
const webpack_stream = require('webpack-stream')
const webpack_config = require('./webpack.config.js');
const webpack = require('webpack');
const git = require('gulp-git');

gulp.task('copyfiles', function () {
  // copy any html files in source/ to public/
  gulp.src('src/styles.css').pipe(gulp.dest('../CIAM.Admin/wwwroot/css'));
  gulp.src('src/img/**/*').pipe(gulp.dest('../CIAM.Admin/wwwroot/css/img'));
  gulp.src("node_modules/bootstrap/dist/css/bootstrap.css").pipe(gulp.dest('../CIAM.Admin/wwwroot/css'))
  gulp.src("node_modules/bootstrap/fonts/*").pipe(gulp.dest('../CIAM.Admin/wwwroot/fonts'))
});



gulp.task('webpack', ['copyfiles'] ,() => {
   return gulp.src("./src/*.js")
    .pipe(webpack_stream(webpack_config, webpack))
    .pipe(gulp.dest('dist/'));
});



gulp.task('deploy', ['webpack'], () => {
  return git.push('azure', 'master');
});

gulp.task('wwwroot', ['webpack'], () => {
  gulp.src('./dist/**/*.js').pipe(gulp.dest('../CIAM.Admin/wwwroot/js/'));

});



gulp.task('default', ['deploy']);
