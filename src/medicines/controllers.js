// @flow
import type { Medicine, Interactions } from './model';
import type { Next } from '../typedefs';
import { Context } from 'koa';

import { getAll, getById, add, removeById, updateById } from './model';

/**
 * Response with all medicines
 */
export async function getAllMedicines(ctx: Context, next: Next): Promise<any> {

  try {
    const result = await getAll();

    ctx.body = result;
  }
  catch(err){
    console.error(err);

    ctx.status = 400;
    ctx.body = { message: `Cannot find medicines.` };  
  }
}

/**
 * Response with one medicine, which id is equal to value ctx.params.id
 */
export async function getMedicineById(ctx: Context, next: Next): Promise<any> {
  
  try {
    const id: string = ctx.params.id;
    const result = await getById(id);
    
    if(!result){
      ctx.status = 400;
      ctx.body = { message: `Cannot find medicine with id=${id}.` };
      return;
    }

    ctx.body = result;
  }
  catch(err){
    console.error(err);

    ctx.status = 400;
    ctx.body = { message: `Cannot find medicine.` };
  }
}

/**
 * Add medicine with values from ctx.request.body
 * Response with created medicine
 */
export async function addMedicine(ctx: Context, next: Next): Promise<any> {

  try {
    const { name, interactions }: { name: string, interactions: Interactions} = ctx.request.body;
    const result = await add({ name, interactions });

    ctx.body = result;
  }
  catch(err){
    console.error(err);

    ctx.status = 400;
    ctx.body = { message: `Cannot add medicine.` };
  }
}

export async function removeMedicineById(ctx: Context, next: Next): Promise<any> {

  try {
    const id: string = ctx.params.id;
    const result = await removeById(id);

    ctx.body = result;
  }
  catch(err){
    console.error(err);

    ctx.status = 400;
    ctx.body = { message: `Cannot remove medicine.` };
  }
}

/**
 * Update medicine with values from ctx.request.body, which id is equal to value ctx.params.id
 * Response with current values of updated medicine
 */
export async function updateMedicineById(ctx: Context, next: Next): Promise<any> {

  try {
    const id: string = ctx.params.id;
    const { name, interactions } = ctx.request.body;
    const result = await updateById(id, { name, interactions });

    ctx.body = result;
  }
  catch(err){
    console.error(err);

    ctx.status = 400;
    ctx.body = { message: `Cannot update medicine.` };
  }
}