var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var gulpBowerFiles = require('gulp-bower-files');


gulp.task('default', function() {
// TODO
});


gulp.task('bower', function () {
    gulp.src('./src/main/html/parameterList.html')
        .pipe(wiredep())
        .pipe(gulp.dest('./build'));
});



gulp.task("bower-files", function(){
    gulpBowerFiles().pipe(gulp.dest("./lib"));
});


gulp.task('build', ['bower', 'bower-files']);