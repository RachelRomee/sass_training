var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');
// var compressor = require('gulp-compressor');

gulp.task('scss', function() {
	return gulp.src(['src/scss/**/*.scss', 'src/scss/*.scss'])
		.pipe(sass())
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.stream());
});

gulp.task('copyFiles', function() {
	return gulp.src(['src/**/*', '!src/scss', '!src/scss/**/*'])
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream());
});

gulp.task('watch', function() {
	gulp.watch('src/scss/**', ['scss']);
	gulp.watch('src/**/*', ['copyFiles']);
});

gulp.task('browser-sync', function() {
	browserSync({
		notify: false,
		server: {
			baseDir: './dist/',
			index: 'index.html',
			port: 3000
		}
	});
});

// html compressor
// gulp.task('html', function () {
//     gulp.src('path/to/*.html')
//         .pipe(compressor({
//             'remove-intertag-spaces': true,
//             'simple-bool-attr': true,
//             'compress-js': true,
//             'compress-css': true
//         }))
//         .pipe(gulp.dest('dist/html'));
// });
//
// // js compressor
// gulp.task('js', function () {
//     gulp.src('path/to/*.js')
//         .pipe(compressor())
//         .pipe(gulp.dest('path/to/output/'));
// });
//
// // css compressor
// gulp.task('css', function () {
//     gulp.src('dist/css/style.css')
//         .pipe(compressor())
//         .pipe(gulp.dest('dist/css/style.css'));
// });

gulp.task('default', function() {
	return runSequence(
		'browser-sync',
		'copyFiles',
		'scss',
		// 'css',
		'watch'
	);
});
