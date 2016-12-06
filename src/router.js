// @flow

import Router from 'koa-router';
import medicinesRouter from './medicines/router';

const router: Router = new Router();

router
  .use(medicinesRouter);

export default router;