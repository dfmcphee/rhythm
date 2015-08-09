var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require("gulp-rename"),
  ejs = require("gulp-ejs"),
  svgo = require('gulp-svgo');

gulp.task('build-ejs', function () {
  gulp.src("./app/views/index.ejs")
    .pipe(ejs({
      ext: '.html',
      title: 'Rhythm',
      ENV_DEVELOPMENT: false
    }))
    .pipe(gulp.dest("./dist"));
});

gulp.task('build-sass', function () {
  gulp.src('./app/assets/stylesheets/rhythm.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./dist/css'));
  gulp.src('./app/assets/stylesheets/ie.scss')
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
  gulp.src('./app/assets/stylesheets/ie.scss')
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

gulp.task('optimize-svgs', function(){
  gulp.src('./public/img/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('./dist/img'));
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
  'build-ejs',
  'build-sass',
  'build-min-sass',
  'optimize-svgs'
]);

gulp.task('default', [
  'sass',
  'develop',
  'watch'
]);
