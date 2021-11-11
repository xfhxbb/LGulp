import { src, dest, series } from "gulp";
import del from "del";
import fs from "fs";
import concat from "gulp-concat-util";
import less from "gulp-less";

function buildLess(cb) {
  let filepath = "../src/css/less";
  let exist = fs.existsSync(filepath);
  if (!exist) {
    console.log(`not found ${filepath}`);
    cb();
  }
  src(["../src/css/entry/*.less"])//only build entry
    .pipe(less())
    .pipe(dest("../dev/css"))
    .pipe(dest("../public/css"));
  cb();
}

function css(cb) {
  let filepath = "../src/css";
  let exist = fs.existsSync(filepath);
  if (!exist) {
    console.log(`not found ${filepath}`);
    cb();
  }
  src(["../src/css/**/*"])
    .pipe(concat("style.css"))
    .pipe(dest("../dev/css"))
    .pipe(dest("../public/css"));
  cb();
}

function cleanCss() {
  return del(["../dev/css/**/*", "../public/css/**/*"], { force: true });
}
const cssTask = series(cleanCss, buildLess);
export { cssTask };
