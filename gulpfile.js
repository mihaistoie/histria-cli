'use strict'
var gulp = require('gulp');
var merge = require('merge2');
var path = require('path');
var del = require('del');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

gulp.task('clean', function () {
    return del([
        'lib/',
        './index.js',
        './src/**/*.js',
        './test/**/*.js'
    ]);

});

gulp.task('default', ['clean'], function () {
    var tsProject = ts.createProject(path.resolve('./tsconfig.json'));
    var tsResult = gulp.src(path.resolve('src/**/*.ts')).pipe(ts(tsProject));

    return merge([
        tsResult.js
		    .pipe(concat('histria.js'))
            .pipe(gulp.dest('dist/js'))
            .pipe(rename('histria.min.js'))
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist/js')),
        tsResult.dts.pipe(gulp.dest('dist/definitions'))
    ]);


});

