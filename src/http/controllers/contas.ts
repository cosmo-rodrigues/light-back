import { getDataFromText } from '@/helpers/getDadaFromText';
import { FastifyReply, FastifyRequest } from 'fastify';
import pdfParse from 'pdf-parse';

export async function pdfUpload(request: FastifyRequest, reply: FastifyReply) {
  try {
    for await (const file of request.files()) {
      const buffer = await file.toBuffer();
      const pdf = await pdfParse(buffer);

      const pdfToString = pdf.text;
      const resultado = await getDataFromText(pdfToString);

      return resultado;
    }
  } catch (error) {
    console.log('ERROR: ', error);
    return reply.status(500).send('Error parsing PDF file');
  }
}
