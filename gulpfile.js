'use strict';
const gulp      = require('gulp');
const assets    = process.cwd() + '/dist';
const sftp      = require('gulp-sftp');
const color     = require('colorful');
const fs        = require('fs');
var prettify    = require('gulp-prettify');

// 部署代码到测试服务器
gulp.task('deploy', () => {
    gulp.src(assets + '/**/*')
        .pipe(sftp({
            host: '192.168.192.60',
            remotePath: '/var/www/html/shangou/huaban',
            user: 'root',
            pass: 'globalwide',
            callback: () => {
                setTimeout(() => {
                    console.log(color.green('\n    √ 部署完毕: \n'));
                }, 500);
            }
        }));
})

gulp.task('prettify', () => {
    fs.readFile('./dist/index.html', 'utf-8', function(err, data) {
        var _new = data.replace(/\<body data-debug\=true\>/, '<body>');
        var _new = _new.replace(/\.\/static/g, '//static.360buyimg.com/shangou/huaban');
        fs.writeFile('./dist/index.html', _new, function() {
            gulp.src('./dist/index.html')
                .pipe(prettify({
                    indent_size: 4
                }))
                .pipe(gulp.dest('./dist'));
        });
    });

    fs.readFile('./dist/preview/index.html', 'utf-8', function(err, data) {
        var _new = data.replace(/\.\.\/create-html\/index\.js/g, '//static.360buyimg.com/shangou/huaban/create-html/index.js');
        fs.writeFile('./dist/preview/index.html', _new, function() {
            gulp.src('./dist/preview/index.html')
                .pipe(prettify({
                    indent_size: 4
                }))
                .pipe(gulp.dest('./dist/preview'));
        });
    });
})

// 默认任务
gulp.task('default', ['prettify']);
