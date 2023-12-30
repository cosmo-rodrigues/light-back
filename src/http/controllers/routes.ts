import { FastifyInstance } from 'fastify';
import {
  create,
  download,
  listAll,
  listByUserNumber,
} from './fatura/fatura.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/fatura', create);
  app.get('/fatura/listar', listAll);
  app.get('/fatura/listar/:numeroDoCliente', listByUserNumber);
  app.get('/fatura/baixar/:numeroDaNotaFiscal', download);
}
