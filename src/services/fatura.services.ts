import { getDataFromText } from '@/helpers/getDadaFromText';
import { dataParser } from '@/helpers/parsedDataToTableStructure';
import { HttpErrorHandler } from '@/http/middlewares/httpErrorHandler';
import { prismaFaturaRepository } from '@/repositories/prisma/prisma.fatura.repository';
import { FastifyRequest } from 'fastify';
import PdfParse from 'pdf-parse';
import { s3SerVices } from './aws/s3.services';

class FaturaServices {
  async create(request: FastifyRequest) {
    const faturasParsed = [];
    for await (const file of request.files()) {
      const buffer = await file.toBuffer();
      const pdf = await PdfParse(buffer);

      const pdfToString = pdf.text;
      const dataFromPdf = await getDataFromText(pdfToString);

      const faturaJaCadastrada = await prismaFaturaRepository.getFaturaByNF(
        dataFromPdf.numeroDaNotaNF
      );
      if (faturaJaCadastrada) {
        throw new HttpErrorHandler(409, 'Fatura já cadastrada');
      }

      const bufferToString = buffer.toString();

      const awsStorageObjectKey = await s3SerVices.upload(
        bufferToString,
        dataFromPdf.numeroDoCliente,
        dataFromPdf.numeroDaNotaNF
      );

      const finalData = dataParser(dataFromPdf, awsStorageObjectKey);

      const createdFatura = await prismaFaturaRepository.create(finalData);

      faturasParsed.push(createdFatura);
    }

    return faturasParsed;
  }

  async listAll() {
    const faturas = await prismaFaturaRepository.getAllRegisteredFaturas();

    return faturas;
  }

  async listByUserNumber(numeroDoCliente: string) {
    const faturas = await prismaFaturaRepository.getFaturaByUserNumber(
      numeroDoCliente
    );

    return faturas;
  }

  async download(numeroDaNotaFiscal: string) {
    const notaSalva = await prismaFaturaRepository.getFaturaByNF(
      numeroDaNotaFiscal
    );

    if (!notaSalva?.awsStorageObjectKey) {
      throw new HttpErrorHandler(404, 'Não é possível baixar esta fatura.');
    }

    const faturaPdfLink = await s3SerVices.generatePresignedUrl(
      notaSalva.awsStorageObjectKey as string
    );

    return faturaPdfLink?.split('?')[0];
  }

  async remove() {}

  async update() {}
}

const faturaServices = new FaturaServices();

export { faturaServices };
