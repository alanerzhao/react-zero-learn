var gulp = require('gulp');
var babel= require('gulp-babel');
var browserSync = require("browser-sync").create();

var reload = browserSync.reload;

//Browser config
var config = require("./bs-config");

/**
 * todo
 * 1.打开一个server
 * 2.编辑jsx
 * 3.当文件改变时刷新浏览器
 *
 */


var babelOpts = {
    nonStandard: true
}
var watchFiles = [
    "learn_1/*.html",
    "src/**/*.js",
]

// Static server
gulp.task('sync', function() {
    browserSync.init(config);
});

//JSX
gulp.task("babel",function () {
    return gulp.src("src/**/*.js")
        .pipe(babel(babelOpts))
        .pipe(gulp.dest('build'))
        .pipe(reload({stream:true}))
})

gulp.task("reload",["babel","sync"],function () {
    gulp.watch(watchFiles)
})

