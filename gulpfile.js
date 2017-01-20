'use strict'
var gulp = require('gulp');
var merge = require('merge2');
var path = require('path');
var del = require('del');
var ts = require('gulp-typescript');
var dts = require('dts-bundle');
var runSequence = require("run-sequence");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var concat = require('gulp-concat');


var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

gulp.task('clean', function () {
    return del([
        'lib/',
        './index.js',
        './src/**/*.js',
        './test/**/*.js'
    ]);

});



gulp.task('ts', ['clean'], function () {
    var tsProject = ts.createProject(path.resolve('./tsconfig.json'));
    var tsResult = gulp.src(path.resolve('./src/**/*.ts')).pipe(tsProject());
    return merge([
        browserify({
            standalone: "MMMMM"

        })
            .add('./src/index.ts')
            .plugin(tsify, { noImplicitAny: true })
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest("dist")),
        tsResult.dts.pipe(gulp.dest('dist/definitions'))
    ]);


    //    var tsProject = ts.createProject(path.resolve('./tsconfig.json'));
    //  var tsResult = gulp.src(path.resolve('src/**/*.ts')).pipe(tsProject());

    //    return merge([
    //        tsResult.js
    //		    .pipe(concat('histria.js'))
    //            .pipe(gulp.dest('dist/js'))
    //            .pipe(rename('histria.min.js'))
    //            .pipe(sourcemaps.init())
    //            .pipe(uglify())
    //            .pipe(sourcemaps.write('./'))
    //            .pipe(gulp.dest('dist/js')),
    //        tsResult.dts.pipe(gulp.dest('dist/definitions'))
    //    ]);


});



gulp.task('definition-bundle', ['ts'], function () {
    dts.bundle({
        name: 'MMMMM',
        main: 'dist/definitions/index.d.ts',
        exclude: /.*typings.*/,
        verbose: false
    });
});



gulp.task('default', ['definition-bundle']);

