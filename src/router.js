// @flow

import Router from 'koa-router';
import usersRouter from './users/router';
import medicinesRouter from './medicines/router';
import contraindicationsRouter from './contraindications/router';

const router = _concatRouters(
  usersRouter,
  medicinesRouter, 
  contraindicationsRouter
);

function _concatRouters(...routers: Router[]): Router {
  return routers.reduce(
    (resultRouter, router) => {
      return resultRouter.use(router.routes(), router.allowedMethods());
    }, 
    new Router()
  );
}

export default router;