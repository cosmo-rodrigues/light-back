import fastify, { FastifyError, FastifyReply } from 'fastify';
import { appRoutes } from './http/controllers/routes';
import multipart from '@fastify/multipart';
import { serverEnv } from './env';
import { HttpErrorHandler } from './http/middlewares/httpErrorHandler';

export const app = fastify();

app.register(multipart, {
  limits: {
    fileSize: serverEnv.FILE_MAX_SIZE,
    files: serverEnv.FILE_MAX_AMOUNT,
  },
});

app.register(appRoutes);

app.setErrorHandler((error: FastifyError, _request, reply: FastifyReply) => {
  if (error instanceof HttpErrorHandler) {
    const { statusCode, message } = error;

    return reply.status(statusCode).send({ message: message });
  }

  return reply.status(500).send({ message: 'Erro interno dos servidor' });
});
