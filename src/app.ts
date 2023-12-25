import fastify from 'fastify';
import { appRoutes } from './http/routes';
import multipart from '@fastify/multipart';
import { serverEnv } from './env';

export const app = fastify();

app.register(multipart, {
  limits: {
    fileSize: serverEnv.FILE_MAX_SIZE,
    files: serverEnv.FILE_MAX_AMOUNT,
  },
});

app.register(appRoutes);
