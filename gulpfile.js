var gulp = require('gulp');
var babel= require('gulp-babel');
var sass = require('gulp-sass');
var sourcemaps = require("gulp-sourcemaps");
var uncss = require("gulp-uncss");
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require("gulp-uglify");
var browserSync = require("browser-sync").create();

var reload = browserSync.reload;

//Browser config
var config = require("./bs-config");


var babelOpts = {
    nonStandard: true
};
//@see http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style
//Type: String Default: nested Values: nested, expanded, compact, compressed
var sassOpts = {
    outputStyle: 'expanded'
};
var sourceMapOpts = {
    loadMaps: true
};
var uncssOpts = {
    html:['app/**/*.html']
};

var src = {
    "html": "app/*.html",
    "js": "src/js/**/*.js",
    "scss" : "src/scss/*.scss"
};


// Static server
gulp.task('server',['sass','babel'], function() {
    browserSync.init(config);
});

//JSX && es6
gulp.task("babel",function () {
    return gulp.src("src/**/*.js")
        .pipe(sourcemaps.init(sourceMapOpts))
        .pipe(babel(babelOpts))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('build'))
        .pipe(reload({stream:true}));
});

//sass
gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOpts))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('build/css'))
        .pipe(reload({stream: true}));
});

//uglify
gulp.task("jsmin",function () {
    return gulp.src("build/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

//uncss
gulp.task("uncss",function () {
    return gulp.src("build/**/*.css")
        .pipe(uncss(uncssOpts))
        .pipe(gulp.dest("build/css"));
});
//mincss
gulp.task('cssmin', function() {
  return gulp.src('build/**/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'));
});

//autoprefixer
gulp.task('prefix', function () {
    return gulp.src('build/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'));
});

//reload
gulp.task("reload",function () {
    reload({stream:true});
});

//build
gulp.task("build",["cssmin","prefix","jsmin"],function () {
    console.log("ok");
});

//developer
gulp.task("dev",["server"],function () {

    gulp.watch(src.scss,["sass"]);
    gulp.watch(src.js,["babel"]);

    gulp.watch(src.html).on("change",reload);

});

