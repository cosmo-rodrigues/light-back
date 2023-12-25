import { serverEnv } from '@/env';
import { getDataFromText } from '@/helpers/getDadaFromText';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import pdfParse from 'pdf-parse';

export async function pdfUpload(request: FastifyRequest, reply: FastifyReply) {
  try {
    const faturasParseadas = [];
    for await (const file of request.files()) {
      const buffer = await file.toBuffer();
      const pdf = await pdfParse(buffer);

      const pdfToString = pdf.text;
      const resultado = await getDataFromText(pdfToString);

      faturasParseadas.push(resultado);
    }
    return faturasParseadas;
  } catch (error) {
    const { code } = error as FastifyError;
    if (code === 'FST_FILES_LIMIT')
      return reply.status(413).send({
        message: `Envio máximo permitido: ${serverEnv.FILE_MAX_AMOUNT} arquivos`,
      });
    if (code === 'FST_REQ_FILE_TOO_LARGE')
      return reply.status(413).send({
        message: `Tamanho máximo permitido: ${serverEnv.FILE_MAX_SIZE} kbs`,
      });

    return reply
      .status(500)
      .send({ message: (error as Error).message || 'Error inesperado' });
  }
}
