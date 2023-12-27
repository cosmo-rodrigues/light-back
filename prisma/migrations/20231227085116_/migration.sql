/*
  Warnings:

  - Made the column `energia_compensada_quantidade` on table `faturas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `energia_compensada_preco_unitario` on table `faturas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `energia_compensada_tarifa_unitaria` on table `faturas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `energia_compensada_valor_total` on table `faturas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "faturas" ALTER COLUMN "energia_compensada_quantidade" SET NOT NULL,
ALTER COLUMN "energia_compensada_quantidade" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "energia_compensada_preco_unitario" SET NOT NULL,
ALTER COLUMN "energia_compensada_tarifa_unitaria" SET NOT NULL,
ALTER COLUMN "energia_compensada_valor_total" SET NOT NULL,
ALTER COLUMN "energia_eletrica_quantidade" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "energia_scee_quantidade" SET DATA TYPE DECIMAL(65,30);
