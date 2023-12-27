import { FastifyInstance } from 'fastify';
import { create, download, list } from './fatura/fatura.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/fatura', create);
  app.get('/fatura/listar/:numeroDoCliente', list);
  app.get('/fatura/baixar/:numeroDaNotaFiscal', download);
}
