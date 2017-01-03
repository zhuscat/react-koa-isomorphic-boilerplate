export default async (ctx, next) => {
  if (ctx.path.match(/^\/api/)) {
    await require('./api').routes()(ctx, next);
  } else {
    await require('./render')(ctx, next);
  }
}