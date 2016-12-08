// @flow

import Router from 'koa-router';
import medicinesRouter from './medicines/router';
import contraindicationsRouter from './contraindications/router';

const router = _concatRouters(
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