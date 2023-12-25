-- CreateEnum
CREATE TYPE "State" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "numeroDoCliente" TEXT NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" SERIAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" TEXT,
    "sem_numero" BOOLEAN NOT NULL DEFAULT true,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" "State" NOT NULL,
    "cep" TEXT,
    "cliente_id" INTEGER,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instalacoes" (
    "id" SERIAL NOT NULL,
    "numeroDaInstalacao" TEXT NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "endereco_id" INTEGER,

    CONSTRAINT "instalacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faturas" (
    "id" SERIAL NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    "instalacao_id" INTEGER NOT NULL,
    "data_da_emissao" TIMESTAMP(3) NOT NULL,
    "data_do_vencimento" TIMESTAMP(3) NOT NULL,
    "fatura_paga" BOOLEAN NOT NULL,
    "data_da_leitura_anterior" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_da_leitura_atual" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_da_proxima_leitura" TIMESTAMP(3) NOT NULL DEFAULT now() + interval '1 month',
    "energia_eletrica_quantidade" TEXT NOT NULL,
    "energia_eletrica_preco_unitario" TEXT NOT NULL,
    "energia_eletrica_valor_total" TEXT NOT NULL,
    "energia_eletrica_tarifa_unitaria" TEXT NOT NULL,
    "energia_SCEE_sem_ICMS_quantidade" TEXT NOT NULL,
    "energia_SCEE_sem_ICMS_preco_unitario" TEXT NOT NULL,
    "energia_SCEE_sem_ICMS_valor_total" TEXT NOT NULL,
    "energia_SCEE_sem_ICMS_tarifa_unitaria" TEXT NOT NULL,
    "energia_compensada_GDI_quantidade" TEXT NOT NULL,
    "energia_compensada_GDI_preco_unitario" TEXT NOT NULL,
    "energia_compensada_GDI_valor_total" TEXT NOT NULL,
    "energia_compensada_GDI_tarifa_unitaria" TEXT NOT NULL,

    CONSTRAINT "faturas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_id_key" ON "clientes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_id_key" ON "enderecos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "instalacoes_id_key" ON "instalacoes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "faturas_id_key" ON "faturas"("id");

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instalacoes" ADD CONSTRAINT "instalacoes_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instalacoes" ADD CONSTRAINT "instalacoes_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faturas" ADD CONSTRAINT "faturas_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faturas" ADD CONSTRAINT "faturas_instalacao_id_fkey" FOREIGN KEY ("instalacao_id") REFERENCES "instalacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
