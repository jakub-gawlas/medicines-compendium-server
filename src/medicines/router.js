// @flow

import Router from 'koa-router';
import { getAllMedicines, getMedicineById, addMedicine, removeMedicineById, updateMedicineById } from './controllers';

const router = new Router({ prefix: '/medicines' });

router
  .get('/', getAllMedicines)
  .get('/:id', getMedicineById)
  .post('/', addMedicine)
  .del('/:id', removeMedicineById)
  .put('/:id', updateMedicineById);

export default router;