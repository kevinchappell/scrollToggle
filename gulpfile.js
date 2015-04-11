'use strict';

var gulp = require('gulp'),
	ugly = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-cssmin'),
	concat = require('gulp-concat'),
	bsync = require('browser-sync'),
	reload = bsync.reload,
	rename = require("gulp-rename");

gulp.task('watch', function() {
	gulp.watch(['src/js/*.js'], ['js']).on('change', reload);
	gulp.watch(['src/sass/*.scss'], ['css']).on('change', reload);
	gulp.watch("example/*.html").on('change', reload);
	gulp.watch("example/*.css").on('change', reload);
});

gulp.task('css', function() {
	return gulp.src("src/sass/*.scss")
		.pipe(sass({
			style: 'expanded'
		}))
		.pipe(cssmin())
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest("dist/css"))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('js', function() {
	gulp.src([
			'src/js/scroll-toggle.js'
		])
		.pipe(concat('scroll-toggle.js'))
		.pipe(gulp.dest('dist/js/'))
		.pipe(ugly())
		.pipe(concat('scroll-toggle.min.js'))
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('demo', function() {
	bsync({
		server: "./",
		index: "./example/index.html"
	});
});

gulp.task('default', ['js', 'css', 'watch', 'demo']);
