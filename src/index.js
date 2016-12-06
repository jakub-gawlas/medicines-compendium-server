// @flow
import type { ListenOptions } from './typedefs';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './medicines/router';
import config from './config';

const app = new Koa();

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const { HOSTNAME, PORT } = config;

const listenOptions: ListenOptions = {
  host: HOSTNAME,
  port: PORT
};

app.listen(listenOptions, () => console.log(`Listening on ${HOSTNAME}:${PORT}`));