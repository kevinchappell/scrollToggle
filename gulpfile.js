'use strict';

var gulp = require('gulp'),
	ugly = require('gulp-uglify'),
	concat = require('gulp-concat'),
	babel = require('gulp-babel'),
	bsync = require('browser-sync'),
	reload = bsync.reload;

gulp.task('watch', function() {
	gulp.watch(['src/js/*.js'], ['js']).on('change', reload);
	gulp.watch("example/*.html").on('change', reload);
});

gulp.task('js', function() {
	gulp.src([
			'src/scroll-toggle.js'
		])
		.pipe(babel())
		.pipe(gulp.dest('dist/'))
		.pipe(ugly())
		.pipe(concat('scroll-toggle.min.js'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('demo', function() {
	bsync({
		server: "./",
		index: "./example/index.html"
	});
});

gulp.task('default', ['js', 'watch', 'demo']);
