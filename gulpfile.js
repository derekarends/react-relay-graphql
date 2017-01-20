const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const dotenv = require('dotenv');
const fs = require('fs');
const del = require('del');

const serverAppFiles = ['src/**/*.js', '!src/www/**'];
const webAppHtmlFiles = ['src/www/**/*.html'];
const webAppSassFiles = ['src/www/css/**/*.scss'];
const entryPoints = ['./src/www/js/index.js'];

const production = process.env.NODE_ENV === 'production';

gulp.task('clean-dist', () => {
  del(['dist/*']);
});

gulp.task('process-server-app', () =>
  gulp.src(serverAppFiles)
    .pipe(babel({ presets: ['es2015'] }))
    .on('error', console.dir)
    .pipe(gulp.dest('dist')));

gulp.task('process-web-app-html', () =>
  gulp.src(webAppHtmlFiles)
    .pipe(gulp.dest('dist/www')));

gulp.task('process-web-app-css', () =>
  gulp.src(webAppSassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/www/css')));

gulp.task('process-web-app-js', () => {
    dotenv.load();

    Promise.all(entryPoints.map(entryPoint =>
      new Promise((resolve, reject) =>
        gulp.src(entryPoint)
            .pipe(webpackStream({
              output: {
                filename: 'bundle-[hash].js',
                chunkFilename: 'bundle-[chunkhash].js'
              },
              module: {
                loaders: [
                  { test: /\.(js|jsx|es6)$/, loader: 'babel', exclude: /node_modules/ },
                  { test: /\.json$/, loader: 'json' },
                ],
              },
              plugins: [
                new webpack.DefinePlugin({
                  'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                  },
                  __ENVIRONMENT_URL__ : JSON.stringify(process.env.ENVIRONMENT_URL),
                  __AUTH0_DOMAIN__ : JSON.stringify(process.env.AUTH0_DOMAIN),
                  __AUTH0_CLIENT_ID__ : JSON.stringify(process.env.AUTH0_CLIENT_ID),
                  __GRAPHQL_ENDPOINT__ : JSON.stringify(process.env.GRAPHQL_ENDPOINT),
                }),
                new webpack.ProvidePlugin({
                  'Promise': 'exports?global.Promise!es6-promise',
                  'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
                  'window.fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
                }),
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin(),
                function () {
                  this.plugin('done', function (stats) {
                    var replaceInFile = function (filePath, toReplace, replacement) {
                      var replacer = function (match) {
                        // console.log('Replacing in %s: %s => %s', filePath, match, replacement);
                        return replacement;
                      };
                      var str = fs.readFileSync(filePath, 'utf8');
                      var out = str.replace(new RegExp(toReplace, 'g'), replacer);
                      fs.writeFileSync(filePath, out);
                    };

                    var hash = stats.hash;

                    replaceInFile('./dist/www/index.html',
                        'bundle.js',
                        'bundle-' + hash + '.js'
                    );
                  });
                }
              ],
              devtool: production ? 'source-map' : 'eval-source-map',
            }))
          .on('error', reject)
          .pipe(gulp.dest('dist/www/js'))
          .on('end', resolve))))
          .catch(err => console.dir(err));
  });

gulp.task('start-web-server', () => {
    require('./dist/server/server.js').default();
  });

gulp.task('default', [
    'process-server-app',
    'process-web-app-html',
    'process-web-app-css',
    'process-web-app-js',
  ]);

gulp.task('watch', [
  'process-server-app',
  'process-web-app-html',
  'process-web-app-css',
  'process-web-app-js',
], () => {
  gulp.watch(serverAppFiles, ['process-server-app']);
  gulp.watch(webAppHtmlFiles, ['process-web-app-html']);
});
