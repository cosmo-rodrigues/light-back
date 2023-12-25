import { FastifyInstance } from 'fastify';
import { pdfUpload } from './controllers/fatura';

export async function appRoutes(app: FastifyInstance) {
  app.post('/fatura', pdfUpload);
}
