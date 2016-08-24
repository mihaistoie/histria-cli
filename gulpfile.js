'use strict'
var gulp = require('gulp');
var merge = require('merge2');
var path = require('path');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

gulp.task('default', function () {
    var tsProject = ts.createProject(path.resolve('./tsconfig.json'));
    var tsResult = gulp.src(path.resolve('src/index.ts')).pipe(ts(tsProject));

    return merge([
        tsResult.js.pipe(concat("histria.js"))
            .pipe(gulp.dest('dist/js'))
            .pipe(rename("histria.min.js"))
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist/js')),
        tsResult.dts.pipe(gulp.dest('dist/definitions'))
    ]);


});

