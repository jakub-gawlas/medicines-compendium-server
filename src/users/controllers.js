// @flow
import type { Next } from '../typedefs';
import { Context } from 'koa';

import { getByUsername } from './model';

const RESPONSES = {
  '200': {
    message: 'Logged in succesfully.'
  },
  '401': {
    message: 'Invalid username or password.'
  }
};

export async function loginUser(ctx: Context, next: Next): Promise<any> {

  try {
    const { username, password }: { username: string, password: string } = ctx.request.body;
    const user = await getByUsername(username);

    if(!user || user.password !== password){
      ctx.status = 401;
      ctx.body = RESPONSES['401'];
      return;
    }

    ctx.body = RESPONSES['200'];
  }
  catch(err){
    console.error(err);

    ctx.status = 401;
    ctx.body = RESPONSES['401'];
  }

}