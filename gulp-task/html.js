
import gulp from 'gulp';
import del from 'del';
import fileinclude from 'gulp-file-include';
/*======= 文件MD5时间戳 ======*/
import cachebust from 'gulp-cache-bust';

function html() {
    return gulp.src(['../src/html/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(cachebust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('../dev/html'))
        .pipe(gulp.dest('../public/html'));
};

function cleanHtml() {
    return del(['../dev/html/**/*', '../public/html/**/*'], { force: true });
}

const htmltask = gulp.series(cleanHtml, html);
export { htmltask }