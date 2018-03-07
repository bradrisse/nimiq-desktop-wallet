var gulp = require('gulp');

gulp.task('core', [], function() {
    console.log("Moving core files to dist");
    gulp.src("core/dist/**.*")
        .pipe(gulp.dest('dist'));
});