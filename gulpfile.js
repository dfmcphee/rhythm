var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer')
  rename = require("gulp-rename");

gulp.task('build-sass', function () {
  gulp.src('./app/assets/stylesheets/rhythm.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('build-min-sass', function () {
  gulp.src('./app/assets/stylesheets/rhythm.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename({
      suffix: ".min",
    }))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('sass', function () {
  gulp.src('./app/assets/stylesheets/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch(['./app/assets/stylesheets/*.scss', './app/assets/stylesheets/**/*.scss'], ['sass']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee ejs',
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed(__dirname);
    }, 500);
  });
});

gulp.task('build', [
  'build-sass',
  'build-min-sass'
]);

gulp.task('default', [
  'sass',
  'develop',
  'watch'
]);
