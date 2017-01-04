#! /usr/bin/env node
require('babel-polyfill');

require('babel-register')({
  presets: ['es2015', 'react', 'stage-0'],
  plugins: [
    'add-module-exports',
    ['babel-plugin-transform-require-ignore', {
      extensions: ['.scss', '.css'],
    }],
  ],
});

require('asset-require-hook')({
  extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'tif', 'tiff', 'webp'],
  name: '/build/[name].[ext]',
  limit: 10000,
});

const app = require('../server/app');
const webpack = require('webpack');
const middlewareRegister = require('../server/middlewareRegister');
const webpackMiddleware = require('koa-webpack-middleware');
const config = require('../webpack.development.config');

const devMiddleware = webpackMiddleware.devMiddleware;
const hotMiddleware = webpackMiddleware.hotMiddleware;
const compiler = webpack(config);

app.use(devMiddleware(compiler, {
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
  publicPath: '/build/',
  stats: {
    colors: true,
  },
}));
app.use(hotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  hearbeat: 10 * 1000,
}));
middlewareRegister(app);
console.log(`\n==> 🌏  Listening on port 3000. Open up http://localhost:3000/ in your browser.\n`);
app.listen(3000);
