const gulp = require('gulp');
const { src, dest } = require('gulp');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function css() {
    return src('less/**/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(dest('css'))
        .pipe(browserSync.stream())
}

function image() {
    return src('./images/*')
        .pipe(imagemin())
        .pipe(dest('./img'))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './',
        }
    });
    gulp.watch('./images/*', image);
    gulp.watch('./less/**/*.less', css);
    gulp.watch('./*.html').on('change', browserSync.reload);
}

exports.watch = watch;
