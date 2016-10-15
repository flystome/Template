const gulp = require('gulp')
const del = require('del')
const merge = require('merge-stream')
const runSequence = require('run-sequence')
const sourcemaps = require('gulp-sourcemaps')

const less = require('gulp-less')
const autoPrefixer = require('gulp-autoprefixer')

const browserify = require('gulp-browserify')

const spritesmith = require('gulp.spritesmith')

const ejs = require('gulp-ejs')

const browserSync = require('browser-sync').create()
const reload = browserSync.reload

var env = {
  'dev': 'src/', // 开发环境
  'test': 'build/', // 测试联调环境
  'production': 'dist/', // 生产发布环境
}

gulp.task('clean:style', function() {
  return del(['build/assets/css/**']);
});
gulp.task('clean:script', function() {
  return del(['build/assets/js/**']);
});
gulp.task('clean:images', function() {
  return del(['build/assets/images/**']);
});
gulp.task('clean:tmpl', function() {
  return del(['build/*.html']);
});

gulp.task('script', ['clean:script'], function() {
  return gulp.src(env.dev + 'assets/script/*.js', {
      read: false
    })
    .pipe(browserify())
    .pipe(gulp.dest(env.test + 'assets/js/'))
})

gulp.task('less', ['clean:style', 'sprite'], function() {
  return gulp.src([env.dev + 'assets/style/*.less'])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(autoPrefixer())
    .pipe(gulp.dest(env.test + 'assets/css/'))
})

gulp.task('sprite', ['clean:images'], function() {
  const spriteData = gulp.src(env.dev + 'assets/images/icons/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css',
      padding: 2,
      cssTemplate: '_config/handlebarsStr.css.handlebars'
    }))

  var imgStream = spriteData.img
    .pipe(gulp.dest(env.dev + 'assets/images/'))

  var cssStream = spriteData.css
    .pipe(gulp.dest(env.dev + 'assets/style/'))

  return merge(imgStream, cssStream)
})

gulp.task('tmpl', ['clean:tmpl'], function() {
  return gulp.src(env.dev + '*.html')
    .pipe(ejs())
    .pipe(gulp.dest(env.test))
})

gulp.task('assets', ['sprite'], function() {
  return gulp.src([env.dev + 'assets/+(images|plugin|data)/**/*.*', '!' + env.dev + 'assets/images/icons/*.*'])
    .on('data', function(file) {
      // console.log(file.history[0])
    })
    .pipe(gulp.dest(env.test + 'assets'))
})

gulp.task('reload', function(done) {
  reload();
  done();
})

gulp.task('build', ['script', 'tmpl', 'less', 'assets'])

gulp.task('seq', function(done) {
  runSequence('less', 'clean', done)
})

gulp.task('default', ['build'], function() {
  browserSync.init({
    server: env.test,
    port: '5555'
  })
  gulp.watch([env.dev + 'assets/script/*.js', env.dev + 'assets/script/**/*.js', env.dev + 'assets/script/**/*.jsx'], function(e) {
    runSequence('script', 'reload')
  })
  gulp.watch([env.dev + 'assets/style/*.less', env.dev + 'assets/style/**/*.less'], function(e) {
    runSequence('less', 'reload')
  })
  gulp.watch([env.dev + '*.html', env.dev + '**/*.html'], function(e) {
    runSequence('tmpl', 'reload')
  })
  gulp.watch([env.dev + 'assets/+(images|plugin|data)/**/*.*'], function(e) {
    runSequence('assets', 'reload')
  })
})
