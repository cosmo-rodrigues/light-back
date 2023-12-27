import { z } from 'zod';

export const listFaturasParamsSchema = z.object({
  numeroDoCliente: z.string(),
});

export const downloadFaturasParamsSchema = z.object({
  numeroDaNotaFiscal: z.string(),
});
