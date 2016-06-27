"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var server = require("browser-sync");
var clean = require("gulp-clean");
var runSequence = require('run-sequence');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');

//Собрать стилевой файл, добавить префиксы,
// скомбинировать медиа-вырадения, минифицировать файл
gulp.task("style", function() {
  return gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]})
      /*,
       mqpacker({
       sort: true
       })
       */
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

//Минифицировать изображения
gulp.task("images", function() {
  return gulp.src("img/*.{png,jpg,svg}")
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true
    }))
    .pipe(gulp.dest("build/img"));
});

//Создать svg-спрайт из почищенных svg-файлов
gulp.task('symbols', function() {
  return gulp.src('img/icons/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest('img'))
});

//Минифицировать и скопировать js-файлы
gulp.task("js", function() {
  return gulp.src("js/*.js")
    .pipe(plumber())
    .pipe(gulp.dest("build/js"))
    .pipe(rename({
      suffix:".min.",
      extname: "js"
    }))
    .pipe(gulp.dest("build/js"));
});

//Скопировать щрифты
gulp.task("copy:fonts", function() {
  return gulp.src("fonts/**/*.{woff,woff2}")
    .pipe(gulp.dest("build/fonts"))
});

//Скопировать html-файлы
gulp.task("copy:html", function() {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

//Очистить папку build при повторной сборке
gulp.task("clean", function () {
  return gulp.src("build", {read: false})
    .pipe(clean({force: true}))
});

//Собрать проект
gulp.task("build", function() {
  runSequence(
    "clean",
    "copy:fonts",
    "copy:html",
    "style",
    "images",
    "js"
  );
});

gulp.task("serve", function() {
  server.init({
    server: "build",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("js/*.js", ["js"]);
  gulp.watch("sass/*.scss", ["style"]);
  gulp.watch("*.html", ["copy:html"]);
});

gulp.task('default', ['build']);
