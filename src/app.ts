import fastify from 'fastify';
import { appRoutes } from './http/routes';
import multipart from '@fastify/multipart';

export const app = fastify();

app.register(multipart, {
  limits: {
    fileSize: 100000,
    files: 10,
  },
});

app.register(appRoutes);
