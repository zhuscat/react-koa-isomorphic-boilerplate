#! /usr/bin/env node
process.env.NODE_ENV = 'development';

require('babel-polyfill');

require('babel-register')({
  presets: ['es2015', 'react', 'stage-0'],
  plugins: [
    'add-module-exports',
    ['babel-plugin-transform-require-ignore', {
      extensions: ['.scss', '.css'],
    }],
    ['inline-replace-variables', {
      __SERVER__: true,
      __CLIENT__: false,
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
const path = require('path');
const fs = require('fs');
const middlewareRegister = require('../server/middlewareRegister');
const webpackMiddleware = require('koa-webpack-middleware');
const config = require('../webpack.development.config');
const serverConfig = require('../server/config');

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
app.use(hotMiddleware(compiler));
middlewareRegister(app);
app.listen(serverConfig.port, () => {
  console.log(`\n==> ✅  Server is listening on port ${serverConfig.port}`);
  console.log(`\n==> 🌏  Open up http://localhost:${serverConfig.port}/ in your browser.\n`);
});
