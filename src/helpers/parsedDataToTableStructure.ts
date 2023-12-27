import { stringToDateTime } from './stringToDateTime';
import { stringToFloat, stringToInteger } from './stringToNumber';

export const dadosDaFatura = {
  awsStorageObjectKey: '',
  bonusItaipu: '',
  chaveDeAcesso: '',
  contribuicaoIlumicaoPublica: '',
  dataDoVencimento: '',
  dataEmissao: '',
  datasDeLeitura: {
    anterior: '',
    atual: '',
    proxima: '',
  },
  diasUtilizando: '',
  energiaCompensadaGDIEmKWh: {
    quantidade: '',
    precoUnitario: '',
    tarifaUnitaria: '',
    valorTotal: '',
  },
  energiaEletricaEmKWh: {
    quantidade: '',
    precoUnitario: '',
    tarifaUnitaria: '',
    valorTotal: '',
  },
  energiaSCEESemICMSEmKWh: {
    quantidade: '',
    precoUnitario: '',
    tarifaUnitaria: '',
    valorTotal: '',
  },
  endereco: {
    bairro: '',
    cep: '',
    cidade: '',
    complemento: '',
    estado: '',
    numero: '',
    rua: '',
  },
  faturaReferenteA: '',
  linkParaConsulta: '',
  nomeDoCliente: '',
  numeroDaInstalacao: '',
  numeroDaNotaNF: '',
  numeroDoCliente: '',
  valorTotalDaFatura: '',
};

type DadosDaFatura = typeof dadosDaFatura;

export function dataParser(data: DadosDaFatura, awsStorageObjectKey: string) {
  return {
    awsStorageObjectKey,
    bonusItaipu: stringToFloat(data.bonusItaipu) || 0,
    chaveDeAcesso: data.chaveDeAcesso,
    contribuicaoIlumicaoPublica: stringToFloat(
      data.contribuicaoIlumicaoPublica
    ),
    dataDoVencimento: stringToDateTime(data.dataDoVencimento),
    dataEmissao: stringToDateTime(data.dataEmissao),
    datasDeLeituraAnterior: stringToDateTime(data.datasDeLeitura.anterior),
    datasDeLeituraAtual: stringToDateTime(data.datasDeLeitura.atual),
    datasDeLeituraProxima: stringToDateTime(data.datasDeLeitura.proxima),
    diasUtilizando: stringToInteger(data.diasUtilizando),
    energiaCompensadaQuantidade: stringToInteger(
      data.energiaCompensadaGDIEmKWh.quantidade
    ),
    energiaCompensadaPrecoUnitario:
      stringToFloat(data.energiaCompensadaGDIEmKWh.precoUnitario) || 0,
    energiaCompensadaTarifaUnitaria:
      stringToFloat(data.energiaCompensadaGDIEmKWh.tarifaUnitaria) || 0,
    energiaCompensadaValorTotal:
      stringToFloat(data.energiaCompensadaGDIEmKWh.valorTotal) || 0,
    energiaEletricaQuantidade:
      stringToInteger(data.energiaEletricaEmKWh.quantidade) || 0,
    energiaEletricaPrecoUnitario: stringToFloat(
      data.energiaEletricaEmKWh.precoUnitario
    ),
    energiaEletricaTarifaUnitaria: stringToFloat(
      data.energiaEletricaEmKWh.tarifaUnitaria
    ),
    energiaEletricaValorTotal: stringToFloat(
      data.energiaEletricaEmKWh.valorTotal
    ),
    energiaSCEEQuantidade: stringToInteger(
      data.energiaSCEESemICMSEmKWh.quantidade
    ),
    energiaSCEEPrecoUnitario: stringToFloat(
      data.energiaSCEESemICMSEmKWh.precoUnitario
    ),
    energiaSCEETarifaUnitaria: stringToFloat(
      data.energiaSCEESemICMSEmKWh.tarifaUnitaria
    ),
    energiaSCEEValorTotal: stringToFloat(
      data.energiaSCEESemICMSEmKWh.valorTotal
    ),
    bairro: data.endereco.bairro,
    cep: data.endereco.cep,
    cidade: data.endereco.cidade,
    complemento: data.endereco.complemento,
    estado: data.endereco.estado,
    numero: data.endereco.numero,
    rua: data.endereco.rua,
    faturaReferenteA: stringToDateTime(data.faturaReferenteA),
    linkParaConsulta: data.linkParaConsulta,
    nomeDoCliente: data.nomeDoCliente,
    numeroDaInstalacao: data.numeroDaInstalacao,
    numeroDaNotaNF: data.numeroDaNotaNF,
    numeroDoCliente: data.numeroDoCliente,
    valorTotalDaFatura: stringToFloat(data.valorTotalDaFatura),
  };
}
