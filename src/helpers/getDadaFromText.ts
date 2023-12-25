const dadosDaConta = {
  numeroDoCliente: '',
  numeroDaInstalacao: '',
  nomeDoCliente: '',
  endereco: {
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    cep: '',
    estado: '',
  },
  dataEmissao: '',
  linkParaConsulta: '',
  chaveDeAcesso: '',
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

function getEmissionDate(text: string) {
  if (text?.includes('datadeemissão:')) {
    const dataEmissao = text?.split(':')[1];

    dadosDaConta.dataEmissao = dataEmissao;
  }
}
function textIterator(texto: string[]) {
  for (let i = 0; i <= texto.length; i++) {
    const standardText = standardizeText(texto[i]);

    getClientInformation(standardText, texto, i);
    getEmissionDate(standardText);
  }
}
export async function getDataFromText(pdfToString: string) {
  const arrayOfTexts = pdfToString.split('\n').filter((item) => item !== '');
  textIterator(arrayOfTexts);

  return dadosDaConta;
}
