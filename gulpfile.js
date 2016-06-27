var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var gulpBowerFiles = require('main-bower-files');


gulp.task('default', function() {
// TODO
});

gulp.task('bower', function () {
    gulp.src('./src/main/html/index.html')
        // .pipe(wiredep({'ignorePath': '../../../bower_components/'}))
        .pipe(gulp.dest('./build'));
});

gulp.task("bower-files", function() {
    gulp.src(gulpBowerFiles()).pipe(gulp.dest("./build"));
});

gulp.task("copy-html", function() {
    gulp.src("./html/*.html")
        .pipe(gulp.dest("./build"));
});

gulp.task("copy-css", function() {
    gulp.src('./src/main/html/app.css').pipe(gulp.dest('./build'));
})

gulp.task("copy-templates", function() {
    gulp.src("./ts/templates/*.html")
        .pipe(gulp.dest("./build/templates"));
        // .pipe(gulp.dest("./build/ts_out/templates"));
});


gulp.task('build', ['bower-files', 'bower', 'copy-templates', 'copy-css']);