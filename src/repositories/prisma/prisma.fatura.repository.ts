import { FaturaCreateInput, FaturaRepository } from '../fatura.repository';
import { prisma } from '@/lib/prisma';

class PrismaFaturaRepository implements FaturaRepository {
  async create(data: FaturaCreateInput) {
    const created = await prisma.fatura.create({
      data,
    });

    return created;
  }

  async getFaturaByUserNumber(
    userNumber: string
  ): Promise<FaturaCreateInput[]> {
    const faturas = prisma.fatura.findMany({
      where: {
        numeroDoCliente: userNumber,
      },
    });

    return faturas;
  }
  async getFaturaByDate(date: string) {
    const faturas = await prisma.fatura.findFirst({
      where: {
        dataEmissao: date,
      },
    });

    return faturas;
  }

  async getFaturaByNF(numeroNf: string) {
    const fatura = await prisma.fatura.findUnique({
      where: {
        numeroDaNotaNF: numeroNf,
      },
    });

    return fatura;
  }
}

const prismaFaturaRepository = new PrismaFaturaRepository();

export { prismaFaturaRepository };
