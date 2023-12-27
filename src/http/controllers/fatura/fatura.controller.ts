import { serverEnv } from '@/env';
import { faturaServices } from '@/services/fatura.services';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import {
  downloadFaturasParamsSchema,
  listFaturasParamsSchema,
} from './fatura.schema';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const created = await faturaServices.create(request);

    return reply.status(201).send({ faturas: created });
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

    return error;
  }
}

export async function list(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { numeroDoCliente } = listFaturasParamsSchema.parse(request.params);
    const faturas = await faturaServices.list(numeroDoCliente);

    return reply.status(200).send({ faturas });
  } catch (error) {
    return error;
  }
}

export async function download(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { numeroDaNotaFiscal } = downloadFaturasParamsSchema.parse(
      request.params
    );
    const faturaPdfLink = await faturaServices.download(numeroDaNotaFiscal);

    return reply.status(200).send({ link: faturaPdfLink });
  } catch (error) {
    return error;
  }
}
