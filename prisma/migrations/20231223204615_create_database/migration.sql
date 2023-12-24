-- CreateEnum
CREATE TYPE "State" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" SERIAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" INTEGER,
    "sem_numero" BOOLEAN NOT NULL DEFAULT true,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" "State" NOT NULL,
    "cliente_id" INTEGER,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instalacoes" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "endereco_id" INTEGER,

    CONSTRAINT "instalacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contas" (
    "id" SERIAL NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    "instalacaoId" INTEGER NOT NULL,
    "data_da_emissao" TIMESTAMP(3) NOT NULL,
    "data_do_vencimento" TIMESTAMP(3) NOT NULL,
    "data_da_leitura_anterior" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_da_leitura_atual" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_da_proxima_leitura" TIMESTAMP(3) NOT NULL DEFAULT now() + interval '1 month',
    "energia_eletrica_em_KWh" INTEGER NOT NULL DEFAULT 0,
    "energia_eletrica_consumo_total" INTEGER NOT NULL DEFAULT 0,
    "energia_eletrica_valor_unitario" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "energia_eletrica_valor_total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "energia_SCEE_sem_ICMS_em_KWh" INTEGER NOT NULL DEFAULT 0,
    "energia_SCEE_sem_ICMS_consumo_total" INTEGER NOT NULL DEFAULT 0,
    "energia_SCEE_sem_ICMS_valor_unitario" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "energia_SCEE_sem_ICMS_valor_total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "energia_compensada_GDI_em_KWh" INTEGER NOT NULL DEFAULT 0,
    "energia_compensada_GDI_gerada" INTEGER NOT NULL DEFAULT 0,
    "energia_compensada_GDI_valor_unitario" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "energia_compensada_GDI_valor_total" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "contas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_id_key" ON "clientes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_id_key" ON "enderecos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "instalacoes_id_key" ON "instalacoes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contas_id_key" ON "contas"("id");

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instalacoes" ADD CONSTRAINT "instalacoes_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instalacoes" ADD CONSTRAINT "instalacoes_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_instalacaoId_fkey" FOREIGN KEY ("instalacaoId") REFERENCES "instalacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
