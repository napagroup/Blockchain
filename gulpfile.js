var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename'); // to rename any file
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var clean = require('gulp-clean')

var rando = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

for (var i = 0; i < 15; i++) {
    rando += possible.charAt(Math.floor(Math.random() * possible.length));
}

gulp.task('staticContent', ['wipeFiles'], function () {
    gulp.src('./client/index.html')
        .pipe(replace('~~**CacheKey**~~', rando))
        .pipe(gulp.dest('./client/compiled'));
     gulp.src(['./client/html/**/*.html'])
        .pipe(replace('~~**CacheKey**~~', rando))
        .pipe(gulp.dest('./client/compiled/html'));
    gulp.src(['./client/img/**/*.*'])
        .pipe(gulp.dest('./client/compiled/img'));
});

gulp.task('wipeFiles', function () {
    return gulp.src('./client/compiled', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('scripts', ['wipeFiles'], function () {
    gulp.src([
        '!./client/scripts/app.js',
        './client/scripts/**/*.js',
    ])
        .pipe(replace('~~**CacheKey**~~', rando))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./client/compiled/scripts'));

    gulp.src([
        './node_modules/**/*.min.js'])
    .pipe(replace('~~**CacheKey**~~', rando))
        .pipe(gulp.dest('./client/compiled/scripts'));
    
     gulp.src(['./client/scripts/app.js']).pipe(concat('app.js'))
     .pipe(replace('~~**CacheKey**~~', rando))
        .pipe(gulp.dest('./client/compiled/scripts'));
});

gulp.task('css', ['wipeFiles'], function () {

    gulp.src([
        './node_modules/**/*.min.css'])
        .pipe(gulp.dest('./client/compiled/css'));
    
     gulp.src([
        './node_modules/**/*.min.css'])
        .pipe(gulp.dest('./client/compiled/css'));
    
    gulp.src([
        './node_modules/components-font-awesome/fonts/*.*'])
        .pipe(gulp.dest('./client/compiled/css/components-font-awesome/fonts'));
    gulp.src([
        './client/css/*.css'])
        .pipe(gulp.dest('./client/compiled/css'));
});

//gulp.task('scripts-minify', function () {
//    gulp.src([
//        '!./app/scripts/all.js',
//        '!./app/app.js',
//        './app/**/*.js'
//    ]).pipe(uglify())
//      .pipe(rename('all.js'))
//      .pipe(gulp.dest('./app/scripts'));

//    gulp.src('./bower_components/**/*.min.js')
//        .pipe(gulp.dest('./app/scripts'))
//});

//gulp.task('sass', ['wipeFiles'], function () {
//    gulp.src('./scss/style.scss')
//      .pipe(sass().on('error', sass.logError))
//      .pipe(minifyCSS())
//      .pipe(rename('style.min.css'))
//      .pipe(gulp.dest('./client/compiled/css'))
//
//    gulp.src('./scss/print.scss')
//      .pipe(sass().on('error', sass.logError))
//      .pipe(minifyCSS())
//      .pipe(rename('print.min.css'))
//      .pipe(gulp.dest('./clientCompiled/css'))
//
//    gulp.src('./bower_components/**/*.min.css')
//        .pipe(gulp.dest('./clientCompiled/css'))
//
//    gulp.src('./bower_components/components-font-awesome/fonts/*.*')
//        .pipe(gulp.dest('./clientCompiled/fonts'))
//
//    gulp.src('./bower_components/components-font-awesome/css/*.*')
//        .pipe(gulp.dest('./clientCompiled/css'))
//
//    gulp.src('./bower_components/pixeden-stroke-7-icon/pe-icon-7-stroke/fonts/*.*')
//        .pipe(gulp.dest('./clientCompiled/fonts'))
//
// gulp.src('./bower_components/bootstrap-sass/assets/fonts/bootstrap/*.*')
//        .pipe(gulp.dest('./clientCompiled/fonts/bootstrap'))
//});

/*
gulp.task('preventcache', function () {
    var rando = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++) {
        rando += possible.charAt(Math.floor(Math.random() * possible.length));
    }


    gulp.src(['./client/compiled/scripts/app.js'])
        .pipe(replace('~~**CacheKey**~~', rando))
        .pipe(gulp.dest('./client/compiled/scripts'));
    
    gulp.src(['./client/compiled/index.html'])
        .pipe(replace('~~**CacheKey**~~', rando))
        .pipe(gulp.dest('./client/compiled'));
    
     gulp.src(['./client/compiled/html/*.html'])
        .pipe(replace('~~**CacheKey**~~', rando))
        .pipe(gulp.dest('./client/compiled/html'));

});
*/

//Set a default tasks
gulp.task('default', ['wipeFiles', 'staticContent', 'scripts', 'css'], function () { });

