import { Prisma } from '@prisma/client';

export type FaturaCreateInput = Prisma.FaturaCreateInput;

export interface FaturaRepository {
  create(data: FaturaCreateInput): Promise<FaturaCreateInput>;

  getFaturaByUserNumber(
    userNumber: string
  ): Promise<FaturaCreateInput[] | null>;

  getFaturaByDate(date: string): Promise<FaturaCreateInput | null>;

  getFaturaByNF(numeroNF: string): Promise<FaturaCreateInput | null>;
}
