const gulp = require('gulp');
const del = require('del');
const webserver = require('gulp-webserver');

const dist = './dist/';

// Assets
gulp.task('assets', function () {
    gulp.src('app/assets/**/*')
        .pipe(gulp.dest(dist + '/assets'));
});

// Styles
gulp.task('styles', function () {
    gulp.src('bower_components/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest(dist + '/styles/vendor'));

    gulp.src('bower_components/foundation-sites/dist/css/foundation.min.css')
        .pipe(gulp.dest(dist + '/styles/vendor'));

    gulp.src('app/styles/**/*')
        .pipe(gulp.dest(dist + '/styles'));
});

// Scripts
gulp.task('scripts', function () {
    gulp.src(['bower_components/foundation-sites/dist/js/foundation.min.js', 'bower_components/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(dist + '/scripts/vendor'));

    gulp.src('node_modules/phaser/build/phaser.min.js')
        .pipe(gulp.dest(dist + '/scripts/vendor'));

    gulp.src('app/scripts/**/*')
        .pipe(gulp.dest(dist + '/scripts'));
});

// Fonts
gulp.task('fonts', function () {
    gulp.src('bower_components/font-awesome/fonts/**/*')
        .pipe(gulp.dest(dist + '/styles/fonts'));
});

// Html
gulp.task('html', function () {
    gulp.src('app/*.html')
        .pipe(gulp.dest(dist));
});

// Serve
gulp.task('serve', function () {
    return gulp.src(dist)
        .pipe(webserver({
            port: 9000,
            open: true
        }));
});

//Clean
gulp.task('clean', function () {
    return del.sync([
        dist
    ]);
});

gulp.task('default', ['clean'], function () {
    gulp.start(['assets', 'styles', 'fonts', 'scripts', 'html']);
});