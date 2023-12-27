import { HttpErrorHandler } from '@/http/middlewares/httpErrorHandler';
import { dadosDaFatura } from './parsedDataToTableStructure';

type ElectricalCostsOptions =
  | 'energiaEletricaEmKWh'
  | 'energiaSCEESemICMSEmKWh'
  | 'energiaCompensadaGDIEmKWh';

function standardizeText(text: string) {
  return text?.toLowerCase()?.replaceAll(' ', '');
}

function parseAddressWithStreetOrAvenue(address: string) {
  const pattern = /^(.*?)\s(\d+)\s?(.*)$/;
  const match = address.match(pattern);
  if (match) {
    dadosDaFatura.endereco.rua = match[1].trim();
    dadosDaFatura.endereco.numero = match[2].trim();
    dadosDaFatura.endereco.complemento = match[3].trim();
  }
}

function parseAddressWithZipCode(address: string) {
  const pattern = /(\d{5}-\d{3})\s(.*?),\s([A-Z]{2})/;
  const match = address.match(pattern);
  if (match) {
    dadosDaFatura.endereco.cep = match[1];
    dadosDaFatura.endereco.cidade = match[2].trim();
    dadosDaFatura.endereco.estado = match[3];
  }
}

function getClientInformation(text: string, arrayOfTexts: string[], i: number) {
  if (text?.includes('nºdoclienten')) {
    const standardText = standardizeText(arrayOfTexts[i - 1]);

    const [numeroDoCliente, numeroDaInstalacao] = arrayOfTexts[i + 1]
      .split(' ')
      .filter((el) => el !== '');
    dadosDaFatura.numeroDoCliente = numeroDoCliente;
    dadosDaFatura.numeroDaInstalacao = numeroDaInstalacao;

    dadosDaFatura.nomeDoCliente = standardText.includes('inscriçãoestadual')
      ? arrayOfTexts[i - 6]
      : arrayOfTexts[i - 5];

    const enderecoComRua = standardText.includes('inscriçãoestadual')
      ? arrayOfTexts[i - 5]
      : arrayOfTexts[i - 4];

    dadosDaFatura.endereco.bairro = standardText.includes('inscriçãoestadual')
      ? arrayOfTexts[i - 4]
      : arrayOfTexts[i - 3];

    const enderecoComCEP = standardText.includes('inscriçãoestadual')
      ? arrayOfTexts[i - 3]
      : arrayOfTexts[i - 2];

    parseAddressWithStreetOrAvenue(enderecoComRua);
    parseAddressWithZipCode(enderecoComCEP.trim());

    dadosDaFatura.linkParaConsulta = arrayOfTexts[i + 7];
    dadosDaFatura.chaveDeAcesso = arrayOfTexts[i + 9];
  }
}

function parseElectricalCostByType(
  type: ElectricalCostsOptions,
  arrayOfTexts: string[],
  i: number
) {
  const [quantidade, precoUnitario, valorTotal, tarifaUnitaria] = arrayOfTexts[
    i
  ]
    .split(' ')
    .filter((el) => el !== '')
    .slice(-4);

  dadosDaFatura[type].quantidade = quantidade;
  dadosDaFatura[type].precoUnitario = precoUnitario;
  dadosDaFatura[type].valorTotal = valorTotal;
  dadosDaFatura[type].tarifaUnitaria = tarifaUnitaria;
}

function getElectricalCostsByType(
  text: string,
  arrayOfTexts: string[],
  i: number
) {
  if (text?.includes('energiaelétricakwh')) {
    parseElectricalCostByType('energiaEletricaEmKWh', arrayOfTexts, i);
  }

  if (text?.includes('energiascees/icmskwh')) {
    parseElectricalCostByType('energiaSCEESemICMSEmKWh', arrayOfTexts, i);
  }

  if (text?.includes('energiacompensadagdikwh')) {
    parseElectricalCostByType('energiaCompensadaGDIEmKWh', arrayOfTexts, i);
  }
}

function getEmissionDate(text: string) {
  if (text?.includes('datadeemissão:')) {
    const dataEmissao = text?.split(':')[1];

    dadosDaFatura.dataEmissao = dataEmissao;
  }
}

function getDateAndValue(text: string, arrayOfTexts: string[], i: number) {
  if (text?.includes('referenteavencimento')) {
    const [faturaReferenteA, dataDoVencimento, valorTotalDaFatura] =
      arrayOfTexts[i + 1].split(' ').filter((el) => el !== '');

    dadosDaFatura.dataDoVencimento = dataDoVencimento;
    dadosDaFatura.faturaReferenteA = faturaReferenteA;
    dadosDaFatura.valorTotalDaFatura = valorTotalDaFatura;
  }
}

function getReferenceDate(text: string, arrayOfTexts: string[], i: number) {
  if (text?.includes('atualnºdediaspróxima')) {
    const [tipoEDatas, diasEDatas] = arrayOfTexts[i + 1].split(' ').slice(-2);
    const datas = tipoEDatas.slice(-10);

    dadosDaFatura.datasDeLeitura.anterior = datas.substring(0, 5);
    dadosDaFatura.datasDeLeitura.atual = datas.substring(5, 10);
    dadosDaFatura.datasDeLeitura.proxima = diasEDatas.substring(2, 7);
    dadosDaFatura.diasUtilizando = diasEDatas.substring(0, 2);
  }
}

function getNumberOfNF(text: string, arrayOfTexts: string[], i: number) {
  if (text?.includes('notafiscalnº')) {
    dadosDaFatura.numeroDaNotaNF = arrayOfTexts[i].split(' ')[3];
  }
}

function getPublicIlluminationContribution(
  text: string,
  arrayOfTexts: string[],
  i: number
) {
  if (text?.includes('contribilumpublica')) {
    dadosDaFatura.contribuicaoIlumicaoPublica = arrayOfTexts[i]
      .split(' ')
      .filter((el) => el != '')
      .slice(-1)[0];
  }
}

function getItaipuBonus(text: string, arrayOfTexts: string[], i: number) {
  if (text?.includes('bônusitaipu')) {
    dadosDaFatura.bonusItaipu = arrayOfTexts[i]
      .split(' ')
      .filter((el) => el != '')
      .slice(-1)[0];
  }
}

function textIterator(arrayOfTexts: string[]) {
  for (let i = 0; i <= arrayOfTexts.length; i++) {
    const standardText = standardizeText(arrayOfTexts[i]);
    // console.log(standardText);

    getClientInformation(standardText, arrayOfTexts, i);
    getElectricalCostsByType(standardText, arrayOfTexts, i);
    getEmissionDate(standardText);
    getDateAndValue(standardText, arrayOfTexts, i);
    getReferenceDate(standardText, arrayOfTexts, i);
    getNumberOfNF(standardText, arrayOfTexts, i);
    getPublicIlluminationContribution(standardText, arrayOfTexts, i);
    getItaipuBonus(standardText, arrayOfTexts, i);
  }
}

function validateBillOrigin(arrayOfTexts: string[]) {
  const contaCemig = arrayOfTexts.find((text) =>
    standardizeText(text).includes(
      'cemigdistribuiçãos.a.cnpj06.981.180/0001-16'
    )
  );

  if (!contaCemig) {
    throw new HttpErrorHandler(
      400,
      'Fatura de origem desconhecida. Verifique o documento enviado'
    );
  }
}
export async function getDataFromText(pdfToString: string) {
  const arrayOfTexts = pdfToString.split('\n').filter((item) => item !== '');

  validateBillOrigin(arrayOfTexts);
  textIterator(arrayOfTexts);

  return dadosDaFatura;
}
