import Router from 'koa-router';

const router = new Router();

router.prefix('/api');

router.get('/user', async ctx => {
  ctx.body = {
    name: 'zhuscat',
    website: 'https://github.com/zhuscat',
  };
});

export default router;