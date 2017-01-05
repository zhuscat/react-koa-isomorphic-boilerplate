import path from 'path';
import koaStatic from 'koa-static';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
import onerror from 'koa-onerror';
import convert from 'koa-convert';
import router from './routes';

const viewPath = path.join(__dirname, './views');

export default (app) => {
  app.use(bodyParser());
  app.use(json());
  app.use(logger());

  app.use(convert(koaStatic(path.join(__dirname, '../public'))));

  app.use(views(viewPath, { extension: 'ejs' }));

  app.use(router);

  onerror(app, { template: path.join(viewPath, '500.ejs') });

  app.use(async (ctx) => {
    ctx.status = 404;
    await ctx.render('404');
  });
};
