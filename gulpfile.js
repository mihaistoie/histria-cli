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


var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");



gulp.task('clean', function () {
    return del([
        'dist/',
        'definitions/',
        'test/',
        'lib/',
        './src/**/*.js',
        './src/**/*.d.ts',
        './index.js'
    ]);

});



gulp.task('ts', ['clean'], function () {
    var tsProject = ts.createProject(path.resolve('./tsconfig.json'));
    var tsResult = gulp.src(['./src/**/*.ts', '!./src/test/**']).pipe(tsProject());
    return merge([
        tsResult.dts.pipe(gulp.dest('./definitions')),
        tsResult.js.pipe(gulp.dest(path.resolve('./'))),
        browserify({standalone: "histria"})
            .add('./src/index.ts')
            .plugin(tsify, { noImplicitAny: true })
            .bundle()
            .pipe(source('histria-cli.js'))
            .pipe(gulp.dest("./dist")),

        ]);

});



gulp.task('test', ['ts'], function () {
    var tsProject = ts.createProject(path.resolve('./tsconfig.json'));
    var tsResult = gulp.src(['./src/test/**/*.ts']).pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(path.resolve('./test')));

});


gulp.task('build', ['test']);
gulp.task('default', ['build']);


