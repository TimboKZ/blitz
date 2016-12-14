/**
 * @file A JavaScript file.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.1.2 Change test directory from `tests` to `test`
 * @since 0.0.1
 */

var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', function() {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['ts'], function() {
    gulp.watch('src/**/*.ts', ['ts']);
    gulp.watch('test/**/*.ts', ['ts']);
});