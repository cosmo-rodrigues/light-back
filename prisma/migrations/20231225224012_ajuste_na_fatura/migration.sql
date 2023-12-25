/*
  Warnings:

  - Added the required column `data_do_pagamento` to the `faturas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_a_ser_pago` to the `faturas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "faturas" ADD COLUMN     "data_do_pagamento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "valor_a_ser_pago" TEXT NOT NULL,
ALTER COLUMN "fatura_paga" DROP NOT NULL,
ALTER COLUMN "data_da_proxima_leitura" SET DEFAULT now() + interval '1 month';
