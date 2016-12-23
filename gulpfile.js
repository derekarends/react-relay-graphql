const fs = require('fs');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const jest = require('jest-cli');
const config = require('./config');

const serverAppFiles = ['src/**/*.js', '!src/www/**'];
const webAppHtmlFiles = ['src/www/**/*.html'];
const webAppSassFiles = ['src/www/css/**/*.scss'];
const entryPoints = ['./src/www/js/index.js'];

const production = process.env.NODE_ENV === 'production';

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

gulp.task('process-web-app-js', () =>
  Promise.all(entryPoints.map(entryPoint =>
    new Promise((resolve, reject) =>
      gulp.src(entryPoint)
          .pipe(webpackStream({
            output: {
              filename: 'bundle.js',
            },
            module: {
              loaders: [
                { test: /\.(js|jsx|es6)$/, loader: 'babel', exclude: /node_modules/ },
                { test: /\.json$/, loader: 'json' },
              ],
            },
            plugins: [
              new webpack.DefinePlugin({
                'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
              }),
              new webpack.ProvidePlugin({
                'Promise': 'exports?global.Promise!es6-promise',
                'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
                'window.fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
              }),
            ],
            devtool: production ? 'source-map' : 'eval-source-map',
          }))
        .on('error', reject)
        .pipe(gulp.dest('dist/www/js'))
        .on('end', resolve))))
        .catch(err => console.dir(err)));

gulp.task('start-web-server', () => {
    require('./dist/server/server.js').default(config);
  });

  gulp.task('run-tests', (done) => {
    gulp.src('__tests__/all.js')
      .pipe(webpackStream({
        target: 'node',
        output: { filename: 'specs.js', publicPath: '/__tests__/' },
        resolve: { alias: { 'sinon': 'sinon/pkg/sinon' } },
        externals: {
          'react/lib/ExecutionEnvironment': true,
          'react/lib/ReactContext': true,
        },
        module: {
          noParse: [/node_modules\/sinon\//],
          loaders: [{
            test: /\.json$/,
            loader: 'json',
          }, {
            test: /\.jsx*$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: { presets: ['react', 'es2015'] },
          }]
        }
      }))
      .on('error', console.dir)
      .pipe(gulp.dest('__tests__'))
      .on('end', () => {
        jest.runCLI({ '_': ['specs'], coverage: true }, __dirname, () => {
          done();
        });
      });
  });

gulp.task('run-tests', (done) => {
  gulp.src('__tests__/all.js')
    .pipe(webpackStream({
      target: 'node',
      output: { filename: 'specs.js', publicPath: '/__tests__/' },
      resolve: { alias: { 'sinon': 'sinon/pkg/sinon' } },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },
      module: {
        noParse: [/node_modules\/sinon\//],
        loaders: [
          { test: /\.json$/, loader: 'json' },
          { test: /\.(js|jsx|es6)$/, loader: 'babel', exclude: /node_modules/ },
        ],
      },
      devtool: 'source-map',
    }))
    .on('error', console.dir)
    .pipe(gulp.dest('__tests__'))
    .on('end', () => {
      jest.runCLI({ '_': ['specs'], coverage: true }, __dirname, () => {
        done();
      });
    });
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
