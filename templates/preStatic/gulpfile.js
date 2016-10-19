const gulp = require('gulp')
// 通用插件引入
const del = require('del') // 删除文件
const merge = require('merge-stream') // 合并多个 stream 流
const runSequence = require('run-sequence') // 安排任务的执行顺序
const sourcemaps = require('gulp-sourcemaps') // 为压缩文件或预处理文件生成用于调试的代码映射
// 样式处理插件
const less = require('gulp-less') // 编译 less 为 css
const autoPrefixer = require('gulp-autoprefixer') // 自动补全 css 属性的浏览器前缀
// JavaScript 模块化方案
const browserify = require('gulp-browserify') // 像写 Node 代码一样写前端代码
// 雪碧图自动合并
const spritesmith = require('gulp.spritesmith')
// 模板引擎
const ejs = require('gulp-ejs')
// 浏览器自动刷新
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
// 环境目录定义
var env = {
  'dev': 'src/', // 开发环境
  'test': 'build/', // 测试联调环境
  'production': 'dist/', // 生产发布环境
}
// 在执行任务之前，先清除该任务产生的文件的任务集
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
