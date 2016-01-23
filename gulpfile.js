var gulp = require('gulp');
var wiredep = require('wiredep').stream;


gulp.task('default', function() {
// TODO
});


gulp.task('bower', function () {
    gulp.src('./src/main/html/parameterList.html')
        .pipe(wiredep())
        .pipe(gulp.dest('./build'));
});