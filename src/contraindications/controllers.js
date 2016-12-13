// @flow
import type { Contraindication } from './model';
import type { Next } from '../typedefs';   
import { Context } from 'koa';

import { getAll, add, removeById } from './model';

/**
 * Response with all contraindications
 */
export async function getAllContraindications(ctx: Context, next: Next): Promise<any> {

  try {
    const result = await getAll();

    ctx.body = result;
  }
  catch(err){
    console.error(err);

    ctx.status = 400;
    ctx.body = { message: `Cannot find contraindications.` };
  }
}

/**
 * Add contraindication with values from ctx.request.body
 * Response with created contraindication
 */
export async function addContraindication(ctx: Context, next: Next): Promise<any> {

  try {
    const { name, icon }: { name: string, icon: string } = ctx.request.body;
    const result = await add({ name, icon });

    ctx.body = result;
  }
  catch(err){
    console.error(err);

    ctx.status = 400;
    ctx.bodt = { message: `Cannot add contraindication.` };
  }
}

export async function removeContraindicationById(ctx: Context, next: Next): Promise<any> {

  try {
    const id: string = ctx.params.id;
    const result = await removeById(id);

    ctx.body = result; 
  }
  catch(err){
    console.error(err);

    ctx.status = 400;
    ctx.body = { message: `Cannot remove contraindication.` }; 
  }
}