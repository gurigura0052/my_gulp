import gulp from "gulp";
const { src, dest, watch, parallel, series } = gulp;
import {deleteSync} from 'del';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import postcss from 'gulp-postcss';
import autoprefixer from "autoprefixer";
import ejs from "gulp-ejs";
import rename from 'gulp-rename';
import browserSync from 'browser-sync';

// 公開用ディレクトリの中身を削除
const clean = (done) => {
  deleteSync([ 'dist' ]);
  done();
};

/**
 * browserSync
 */
// 監視するディレクトリを設定
const sync = () =>
  browserSync.init({
    server: {
      baseDir: 'dist/'
    }
  });
// 上で設定したディレクトリが変更されたらリロード
const reload = (done) => {
  browserSync.reload();
  done();
}


/**
 * コンパイル
 */
// sass
const compileSass = () =>
  src("src/sass/**/*.scss")
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe(postcss([
      autoprefixer({
        cascade: false
      })
    ]))
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
// ejs
const compileEjs = () =>
  src(["src/ejs/**/*.ejs", '!' + "src/ejs/**/_*.ejs"])
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(dest('dist'));


/**
 * アセットを公開用ディレクトリにコピー
 */
// images
const copyImages = (done) => {
  src("assets/images/**/*")
      .pipe(dest("dist/images"));
  done();
};
// js
const copyJs = (done) => {
  src("assets/js/**/*.js")
      .pipe(dest("dist/js"));
  done();
};


/**
 * gulp動作設定
 */
// gulp起動時の動作
const gulpStart = parallel(compileSass, compileEjs, copyImages, copyJs);

// 変更を監視するファイルと動作
const watchFile = () => {
  watch("dist/", reload),
  watch("assets/images", copyImages),
  watch("assets/js", copyJs),
  watch("src/sass/**/*.scss", compileSass),
  watch("src/ejs/**/*.ejs", compileEjs)
}


/**
 * コマンド
 */
// npx gulp
export default series(clean, gulpStart, parallel(sync, watchFile))

// npx gulp bulid
// exports.build = series(clean, gulpStart)
