-- CreateEnum
CREATE TYPE "State" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "numero_do_cliente" TEXT NOT NULL,

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
    "numero_da_instalacao" TEXT NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "endereco_id" INTEGER,

    CONSTRAINT "instalacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faturas" (
    "id" SERIAL NOT NULL,
    "chave_de_acesso" TEXT NOT NULL,
    "data_do_vencimento" TEXT NOT NULL,
    "data_emissao" TEXT NOT NULL,
    "datas_de_leitura_anterior" TEXT NOT NULL,
    "datas_de_leitura_atual" TEXT NOT NULL,
    "datas_de_leitura_proxima" TEXT NOT NULL,
    "dias_utilizando" TEXT NOT NULL,
    "energia_compensada_quantidade" TEXT NOT NULL,
    "energia_compensada_preco_unitario" TEXT NOT NULL,
    "energia_compensada_tarifa_unitaria" TEXT NOT NULL,
    "energia_compensada_valor_total" TEXT NOT NULL,
    "energia_eletrica_quantidade" TEXT NOT NULL,
    "energia_eletrica_preco_unitario" TEXT NOT NULL,
    "energia_eletrica_tarifa_unitaria" TEXT NOT NULL,
    "energia_eletrica_valor_total" TEXT NOT NULL,
    "energia_scee_quantidade" TEXT NOT NULL,
    "energia_scee_preco_unitario" TEXT NOT NULL,
    "energia_scee_tarifa_unitaria" TEXT NOT NULL,
    "energia_scee_valor_total" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "complemento" TEXT,
    "estado" TEXT NOT NULL,
    "numero" TEXT,
    "rua" TEXT NOT NULL,
    "fatura_referente_a" TEXT NOT NULL,
    "link_para_consulta" TEXT NOT NULL,
    "nome_do_cliente" TEXT NOT NULL,
    "numero_da_instalacao" TEXT NOT NULL,
    "numero_da_nota_nf" TEXT NOT NULL,
    "numero_do_cliente" TEXT NOT NULL,
    "aws_storage_object_key" TEXT,
    "valor_total_da_fatura" TEXT NOT NULL,
    "cliente_id" INTEGER,
    "endereco_id" INTEGER,
    "instalacao_id" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_id_key" ON "clientes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_id_key" ON "enderecos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "instalacoes_id_key" ON "instalacoes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "faturas_id_key" ON "faturas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "faturas_chave_de_acesso_key" ON "faturas"("chave_de_acesso");

-- CreateIndex
CREATE UNIQUE INDEX "faturas_numero_da_nota_nf_key" ON "faturas"("numero_da_nota_nf");

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instalacoes" ADD CONSTRAINT "instalacoes_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instalacoes" ADD CONSTRAINT "instalacoes_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faturas" ADD CONSTRAINT "faturas_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faturas" ADD CONSTRAINT "faturas_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faturas" ADD CONSTRAINT "faturas_instalacao_id_fkey" FOREIGN KEY ("instalacao_id") REFERENCES "instalacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
