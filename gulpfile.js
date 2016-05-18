var gulp = require('gulp');
var sass = require('gulp-sass');

var sassDir = 'assets/sass/';
var cssDir  = 'dist/css/';
var srcDir  = 'src/';
var appDir  = 'dist/app/';

/* Mixed */
var ext_replace = require('gulp-ext-replace');

/* CSS */
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');

/* JS & TS */
var jsuglify = require('gulp-uglify');
var typescript = require('gulp-typescript');

/* Images */
var imagemin = require('gulp-imagemin');

var tsProject = typescript.createProject('tsconfig.json');

gulp.task('build-css', function () {
    return gulp.src(sassDir + 'app.sass')
        .pipe(sass())
        .pipe(postcss([precss, autoprefixer, cssnano]))
        .pipe(gulp.dest(cssDir));
});

gulp.task('build-ts', function () {
    return gulp.src(srcDir + '**/*.ts')
        .pipe(typescript(tsProject))
        .pipe(gulp.dest(appDir));
});

gulp.task('watch', function () {
    gulp.watch(srcDir + '**/*.ts', ['build-ts']);
    gulp.watch(sassDir + '**/*.sass', ['build-css']);
});

gulp.task('default', ['watch', 'build-ts', 'build-css']);
