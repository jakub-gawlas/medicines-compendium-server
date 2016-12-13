// @flow

import Router from 'koa-router';
import { loginUser } from './controllers';

const router = new Router();

router
  .post('/login', loginUser);

export default router;