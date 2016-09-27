var gulp = require('gulp'),
    del = require('del'),
    plugins = require('gulp-load-plugins')();

gulp.task('default', ['build']);
gulp.task('clean', clean);
gulp.task('build', ['compileCss', 'minifyJs']);
gulp.task('watch', ['build'], watch);

gulp.task('compileCss', compileCss);
gulp.task('minifyJs', minifyJs);

function clean (cb) {
    del('dist', cb);
}

function compileCss () {
    return gulp.src('src/interaction-animations.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({outputStyle: 'compressed'}).on('error', plugins.sass.logError))
        .pipe(plugins.sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist'));
}

function minifyCss () {
    return gulp.src('dist/interaction-animations.css')
        .pipe(plugins.cleanCss())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
}

function minifyJs () {
    return gulp.src('src/**/*.js')
        .pipe(plugins.order([
            'src/makePlugin.js',
            'src/**/*.js'
        ]))
        .pipe(plugins.concat('jquery.interaction-animations.js'))
        .pipe(gulp.dest('dist'))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
}

function watch () {
    gulp.watch('src/*.js', ['minifyJs']);
    gulp.watch('src/*.scss', ['compileCss']);
}