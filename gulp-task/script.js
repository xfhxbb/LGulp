
import webpack from "webpack";
import webpackDev from "./webpack.dev";
import webpackProd from "./webpack.prod";
import del from "del";
import { series } from "gulp";

const dev = (cb) => {
  runWebpack(webpackDev, cb);
}

const prod = (cb) => {
  runWebpack(webpackProd, cb);
}

const runWebpack = (config, cb) => {
  webpack(config, (err, stats) => {
    if (err) {
      console.log(err);
    }
    console.log(stats.toString());
    cb();
  });
}

function cleanJs() {
  return del(["../dev/js/*", "../public/js/*"], { force: true });
}

const jsTask = series(cleanJs, dev, prod);

export {
  jsTask
}