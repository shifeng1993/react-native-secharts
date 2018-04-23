var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  del = require('del');

// html任务
gulp.task('html', function () {
  return gulp
    .src('src/*.html')
    .pipe(gulp.dest('dist'));
});

// echartsjs任务
gulp.task('echartsjs', function () {
  return gulp.src('src/echarts.js') //需要操作的文件
    .pipe(uglify()) //压缩
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist')); //输出
});

gulp.task('js', function () {
  return gulp.src('src/*.js') //需要操作的文件
    .pipe(gulp.dest('dist')); //输出
});

// 清空之前缓存
gulp.task('clean', function (cb) {
  del(['dist/*'], cb);
});

//默认执行任务
gulp.task('default', [
  'clean', 'html', 'js', 'echartsjs'
], function () {
  gulp.start('html', 'js', 'echartsjs');
});