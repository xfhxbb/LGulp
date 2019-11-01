'use strict';
import gulp from 'gulp';
/*======= 文件删除 ======*/
import del from 'del';
import child_process from 'child_process';
import bs from 'browser-sync';
import { jstask } from './script';
import { htmltask } from './html';

let browserSync = bs.create();

/*======= css ======*/
function css() {
    return gulp.src(['../src/css/**/*'])
        .pipe(gulp.dest('../dev/css'))
        .pipe(gulp.dest('../public/css'))
};
/*======= lib ======*/
function lib() {
    return gulp.src(['../src/lib/**/*'])
        .pipe(gulp.dest('../dev/lib'))
        .pipe(gulp.dest('../public/lib'))
};

/*======= img ======*/
function img() {
    return gulp.src(['../src/img/**/*'])
        .pipe(gulp.dest('../dev/img'))
        .pipe(gulp.dest('../public/img'))
};



function clean() {
    return del(['../dev/js/**/*', '../public/js/**/*', '../dev/html/**/*', '../public/html/**/*', '../dev/css/**/*', '../public/css/**/*'], { force: true });
};

let process,
    restart = function () {
        process && process.kill();
        process = child_process.spawn('gulp.cmd', ['run'], {
            stdio: 'inherit'
        });
    };
function server(cb) {
    browserSync.init({
        server: {
            baseDir: "../"
        },
        startPath: "/dev/html/index.html"
    });
    cb();
};
function reload(done) {
    browserSync.reload();
    done();
}
function watch() {
    gulp.watch('../src/lib/**/*', lib);
    gulp.watch('../src/css/**/*', css);
    gulp.watch('../src/img/**/*', img);
    gulp.watch('../src/js/**/*', gulp.series(htmltask, jstask, reload));
    gulp.watch('../src/html/**', gulp.series(htmltask, reload));
    gulp.watch('./*.js', restart);
}

exports.run = gulp.series(clean, gulp.parallel(lib, img, css, jstask), htmltask, server, watch, (done) => { done() });

/*   
 * auto restart gulp
 **/
exports.default = () => {
    restart();
};
