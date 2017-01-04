import path from 'path';
import koaStatic from 'koa-static';
import views from 'koa-views';
import convert from 'koa-convert';
import router from './routes';

const viewPath = path.join(__dirname, './views');

export default (app) => {
  app.use(convert(koaStatic(path.join(__dirname, '../public'))));
  app.use(views(viewPath, { extension: 'ejs' }));
  app.use(router);

  if (app.env === 'development') {
    app.use(async (ctx, next) => {
      const start = Date.now();
      await next();
      const interval = Date.now() - start;
      console.log(`${ctx.method} ${ctx.url} - ${interval}ms`);
    });
  }

  app.use(async (ctx) => {
    ctx.status = 404;
    await ctx.render('404');
  });
};
