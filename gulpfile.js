var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var gulpBowerFiles = require('main-bower-files');


gulp.task('default', function() {
// TODO
});

gulp.task('bower', function () {
    gulp.src('./src/main/html/parameterList.html')
        .pipe(wiredep({'ignorePath': '../../../bower_components/'}))
        .pipe(gulp.dest('./build'));
});

gulp.task("bower-files", function() {
    gulp.src(gulpBowerFiles()).pipe(gulp.dest("./build"));
});

gulp.task("copy-html", function() {
    gulp.src("./html/*.html")
        .pipe(gulp.dest("./build"));
})

gulp.task('build', ['bower-files', 'bower']);