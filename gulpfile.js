'use strict'
var gulp = require('gulp');
var path = require('path');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

gulp.task('default', function () {
    var tsProject = ts.createProject(path.resolve('./src/tsconfig.json'));
    return gulp.src('src/**/*.ts')
        .pipe(ts(tsProject))
		.pipe(concat("histria.js"))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename("histria.min.js"))
        .pipe(sourcemaps.init())
        .pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/js'));
		
        
		
});
