var gulp = require('gulp');
var babel= require('gulp-babel');
var sass = require('gulp-sass');
var browserSync = require("browser-sync").create();

var reload = browserSync.reload;

//Browser config
var config = require("./bs-config");


var babelOpts = {
    nonStandard: true
}

var src = {
    "html": "app/*.html",
    "js": "src/js/**/*.js",
    "scss" : "src/scss/*.scss"
}


// Static server
gulp.task('server', function() {
    browserSync.init(config);
});

//JSX && es6
gulp.task("babel",function () {
    return gulp.src("src/**/*.js")
        .pipe(babel(babelOpts))
        .pipe(gulp.dest('build'))
        .pipe(reload({stream:true}))
})

//sass
gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
        .pipe(reload({stream: true}));
});

//reload
gulp.task("reload",function () {
    reload({stream:true});
})

//developer
gulp.task("dev",["server"],function () {

    gulp.watch(src.scss,["sass"])
    gulp.watch(src.js,["babel"])

    gulp.watch(src.html).on("change",reload)

})

