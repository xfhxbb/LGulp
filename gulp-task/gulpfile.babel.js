"use strict";
import gulp from "gulp";
import child_process from "child_process";
import bs from "browser-sync";
import { fontTask } from "./font";
import { imgTask } from "./img";
import { cssTask } from "./css";
import { jsTask } from "./script";
import { htmltask } from "./html";


let browserSync = bs.create();

/*======= lib ======*/
function lib() {
  return gulp
    .src(["../src/lib/**/*"])
    .pipe(gulp.dest("../dev/lib"))
    .pipe(gulp.dest("../public/lib"));
}

let process,
  restart = function () {
    process && process.kill();
    process = child_process.spawn("gulp.cmd", ["run"], {
      stdio: "inherit"
    });
  };

const build = gulp.series(
  gulp.parallel(lib, jsTask, cssTask, fontTask, imgTask),
  htmltask,
  done => {
    done();
  }
);

function server(cb) {
  browserSync.init({
    server: {
      baseDir: "../"
    },
    startPath: "/dev/html/index.html"
  });
  cb();
}

function reload(done) {
  browserSync.reload();
  done();
}

function watch() {
  gulp.watch("../src/lib/**/*", gulp.series(lib, reload));
  gulp.watch("../src/css/**/*", gulp.series(cssTask, reload));
  gulp.watch("../src/font/**/*", gulp.series(fontTask, reload));
  gulp.watch("../src/img/**/*", gulp.series(imgTask, reload));
  gulp.watch("../src/js/**/*", gulp.series(jsTask, reload));
  gulp.watch("../src/html/**", gulp.series(htmltask, reload));
  gulp.watch("../gulp-task/**", restart);
}


exports.run = gulp.series(
  build,
  server,
  watch,
  done => {
    done();
  }
);

/*
 * auto restart gulp
 **/
exports.default = () => {
  restart();
};
