# gulp

## ディレクトリ構造
```
project
  - dist // コンパイル後
  - assets // コンパイルしないファイル
    - images
    - js
  - src // コンパイル前のソースファイル
    - ejs
    - sass
  - package.json
  - gulpfile.js
  - .browserslistrc // autoprefixer動作時の対象ブラウザを設定
```

## gulpインストール
```
$ npm install
```

## 開発
```
$ npx gulp
```

## ビルド
```
npx gulp build
```

---

### .browserslistrc
設定した対象ブラウザに必要なベンダープリフィックスを自動で付与する。
[browserslist/browserslist #config-file](https://github.com/browserslist/browserslist#config-file)
