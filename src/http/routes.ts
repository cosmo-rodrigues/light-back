import { FastifyInstance } from 'fastify';
import { pdfUpload } from './controllers/contas';

export async function appRoutes(app: FastifyInstance) {
  app.post('/contas', pdfUpload);
}
