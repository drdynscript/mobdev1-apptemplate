var gulp        = require('gulp');
var gulpSass    = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Static Server & watching scss / html files
gulp.task('serve', function() {
    browserSync.init({
        server: './app',
        port: 8080,
        ui: {
            port: 8081,
            weinre: {
                port: 9081
            }
        }
    });

    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('app/*.html').on('change', browserSync.reload)
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src('app/scss/*.scss')
        .pipe(gulpSass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

// Default Task
gulp.task('default', ['serve']);