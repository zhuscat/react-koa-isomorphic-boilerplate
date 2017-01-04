import apiRouter from './api';
import renderRouter from './render';

export default async (ctx, next) => {
  if (ctx.path.match(/^\/api/)) {
    await apiRouter.routes()(ctx, next);
  } else {
    await renderRouter(ctx, next);
  }
};
