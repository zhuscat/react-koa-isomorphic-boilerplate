import Router from 'koa-router';
import userController from '../controllers/user';

const router = new Router();

router.prefix('/api');

router.get('/user', userController);

export default router;
