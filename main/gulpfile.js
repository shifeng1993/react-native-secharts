var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  del = require('del');

gulp.task('echarts', function () {
  return gulp.src('src/lib/*.js') //需要操作的文件
    .pipe(uglify()) //压缩
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/lib/')); //输出
});

gulp.task('tmp', function () {
  return gulp.src('src/tmp/*.js') //需要操作的文件
    .pipe(gulp.dest('dist/tmp/')); //输出
});

gulp.task('utils', function () {
  return gulp.src('src/utils/*.js') //需要操作的文件
    .pipe(gulp.dest('dist/utils/')); //输出
});

gulp.task('index', function () {
  return gulp.src('src/index.js') //需要操作的文件
    .pipe(gulp.dest('dist/')); //输出
});

//默认执行任务
gulp.task('default', gulp.series(gulp.parallel('index', 'echarts', 'tmp', 'utils')), function (done) {
  done();
});