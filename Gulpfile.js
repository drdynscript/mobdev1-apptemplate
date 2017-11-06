var gulp        = require('gulp');
var gulpSass    = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Static Server & watching scss / html files
gulp.task('serve', function() {
    browserSync.init({
        server: './app'
    });

    gulp.watch('app/scss/*.scss', ['sass']);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src('app/scss/*.scss')
        .pipe(gulpSass())
        .pipe(gulp.dest('app/css'));
});