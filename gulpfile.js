'use strict'
var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: false,
            out: 'output.js',
            target: 'ES5' 
        }))
        .pipe(gulp.dest('dist/js'));
});

