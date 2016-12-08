// @flow

import Router from 'koa-router';
import { getAllContraindications, addContraindication, removeContraindicationById } from './controllers';

const router = new Router({ prefix: '/contraindications' });

router
  .get('/', getAllContraindications)
  .post('/', addContraindication)
  .del('/:id', removeContraindicationById);

export default router;