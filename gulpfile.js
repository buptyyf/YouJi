var gulp =  require('gulp');
var replace = require('gulp-replace');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var rnCssJs = require('gulp-rn-css-js');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var rnCssJs = require('gulp-rn-css-js');

const SCSSPATH = './src/**/!(_)*.{scss,css}';
gulp.task('scss', function () {
    return gulp.src(SCSSPATH)
        .pipe(
            plumber({
                errorHandler: (e)=> {
                    gutil.beep();
                    gutil.log(e.message);
                }
            })
        )
        .pipe(rnCssJs({
            prettyPrint: true,   // 是否进行格式化打印
            useEs6: false,        // 以es6输出
            tsAble: false,        // 是否支持typescript
            literalObject: true, // 不包括reactnative StyleSheet处理
            specialParse: []     // 特殊处理集合
        }))
        .pipe(gulp.dest('./src'))
        .on('end', function () {
                gutil.log('scss compile finished √');
            }
        );
});
gulp.task('compileTs', function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        

    return tsResult.js
        .pipe(sourcemaps.write('./'))
        .pipe(replace(/(require\([\'"][\.\/a-zA-Z0-9\-\_]*?\.)(scss|css)([\'"]\))/gi, '$1js$3'))        
        .pipe(gulp.dest('built'))
        .on('end', function () {
                gutil.log('typescript compile finished √');
            }
        );
});
gulp.task('dev', ['scss'], function () {

    watch(SCSSPATH, {readDelay:1000}, batch(function (events, done) {
        gulp.start('scss', done);
    }));
});