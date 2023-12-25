type ElectricalCostsOptions =
  | 'energiaEletricaEmKWh'
  | 'energiaSCEESemICMSEmKWh'
  | 'energiaCompensadaGDIEmKWh';

const dadosDaConta = {
  chaveDeAcesso: '',
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
  numeroDoCliente: '',
  valorTotalDaFatura: '',
};

function standardizeText(text: string) {
  return text?.toLowerCase()?.replaceAll(' ', '');
}

function parseAddressWithStreetOrAvenue(address: string) {
  const pattern = /^(.*?)\s(\d+)\s?(.*)$/;
  const match = address.match(pattern);
  if (match) {
    dadosDaConta.endereco.rua = match[1].trim();
    dadosDaConta.endereco.numero = match[2].trim();
    dadosDaConta.endereco.complemento = match[3].trim();
  }
}

function parseAddressWithZipCode(address: string) {
  const pattern = /(\d{5}-\d{3})\s(.*?),\s([A-Z]{2})/;
  const match = address.match(pattern);
  if (match) {
    dadosDaConta.endereco.cep = match[1];
    dadosDaConta.endereco.cidade = match[2].trim();
    dadosDaConta.endereco.estado = match[3];
  }
}

function getClientInformation(text: string, arrayOfTexts: string[], i: number) {
  if (text?.includes('nºdoclienten')) {
    const standardText = standardizeText(arrayOfTexts[i - 1]);

    const [numeroDoCliente, numeroDaInstalacao] = arrayOfTexts[i + 1]
      .split(' ')
      .filter((el) => el !== '');
    dadosDaConta.numeroDoCliente = numeroDoCliente;
    dadosDaConta.numeroDaInstalacao = numeroDaInstalacao;

    dadosDaConta.nomeDoCliente = standardText.includes('inscriçãoestadual')
      ? arrayOfTexts[i - 6]
      : arrayOfTexts[i - 5];

    const enderecoComRua = standardText.includes('inscriçãoestadual')
      ? arrayOfTexts[i - 5]
      : arrayOfTexts[i - 4];

    dadosDaConta.endereco.bairro = standardText.includes('inscriçãoestadual')
      ? arrayOfTexts[i - 4]
      : arrayOfTexts[i - 3];

    const enderecoComCEP = standardText.includes('inscriçãoestadual')
      ? arrayOfTexts[i - 3]
      : arrayOfTexts[i - 2];

    parseAddressWithStreetOrAvenue(enderecoComRua);
    parseAddressWithZipCode(enderecoComCEP.trim());

    dadosDaConta.linkParaConsulta = arrayOfTexts[i + 7];
    dadosDaConta.chaveDeAcesso = arrayOfTexts[i + 9];
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

  dadosDaConta[type].quantidade = quantidade;
  dadosDaConta[type].precoUnitario = precoUnitario;
  dadosDaConta[type].valorTotal = valorTotal;
  dadosDaConta[type].tarifaUnitaria = tarifaUnitaria;
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

    dadosDaConta.dataEmissao = dataEmissao;
  }
}

function getDateAndValue(text: string, arrayOfTexts: string[], i: number) {
  if (text?.includes('referenteavencimento')) {
    const [faturaReferenteA, dataDoVencimento, valorTotalDaFatura] =
      arrayOfTexts[i + 1].split(' ').filter((el) => el !== '');

    dadosDaConta.dataDoVencimento = dataDoVencimento;
    dadosDaConta.faturaReferenteA = faturaReferenteA;
    dadosDaConta.valorTotalDaFatura = valorTotalDaFatura;
  }
}

function getReferenceDate(text: string, arrayOfTexts: string[], i: number) {
  if (text?.includes('atualnºdediaspróxima')) {
    const [tipoEDatas, diasEDatas] = arrayOfTexts[i + 1].split(' ');
    const datas = tipoEDatas.split('fásico')[1];
    dadosDaConta.datasDeLeitura.anterior = datas.substring(0, 5);
    dadosDaConta.datasDeLeitura.atual = datas.substring(5, 10);
    dadosDaConta.datasDeLeitura.proxima = diasEDatas.substring(2, 7);
    dadosDaConta.diasUtilizando = diasEDatas.substring(0, 2);
  }
}

function textIterator(arrayOfTexts: string[]) {
  for (let i = 0; i <= arrayOfTexts.length; i++) {
    const standardText = standardizeText(arrayOfTexts[i]);

    getClientInformation(standardText, arrayOfTexts, i);
    getElectricalCostsByType(standardText, arrayOfTexts, i);
    getEmissionDate(standardText);
    getDateAndValue(standardText, arrayOfTexts, i);
    getReferenceDate(standardText, arrayOfTexts, i);
  }
}

function validateBillOrigin(arrayOfTexts: string[]) {
  const contaCemig = arrayOfTexts.find((text) =>
    standardizeText(text).includes(
      'cemigdistribuiçãos.a.cnpj06.981.180/0001-16'
    )
  );

  if (!contaCemig) {
    throw new Error(
      'Fatura de origem desconhecida. Verifique o documento enviado'
    );
  }
}
export async function getDataFromText(pdfToString: string) {
  const arrayOfTexts = pdfToString.split('\n').filter((item) => item !== '');

  validateBillOrigin(arrayOfTexts);
  textIterator(arrayOfTexts);

  return dadosDaConta;
}
