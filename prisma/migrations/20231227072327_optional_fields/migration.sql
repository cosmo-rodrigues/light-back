-- AlterTable
ALTER TABLE "faturas" ALTER COLUMN "energia_compensada_quantidade" DROP NOT NULL,
ALTER COLUMN "energia_compensada_preco_unitario" DROP NOT NULL,
ALTER COLUMN "energia_compensada_tarifa_unitaria" DROP NOT NULL,
ALTER COLUMN "energia_compensada_valor_total" DROP NOT NULL;
