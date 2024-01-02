# Light - API

## _Seu gerenciador de consumo de energia elétrica_

Aqui você pode cadastrar suas faturas de energia elétrica e companhar o seu consumo mês a mês.

- Cadaste faturas em PDF
- Faça download de faturas salvas
- Mantenha um registro
- Buscar cliente pelo número de registro
- Buscar fatura pelo número da NF

## Tecnologia

- Node Js para construção da aplicação
- Fastify para criação de interfaces de api
- Prisma ORM para comunicação com o banco de dados
- PostgreSQL
- AWS SDK para comunicação com os serviços da AWS, como S3

## Instalação

Este projeto necessita do [Node.js](https://nodejs.org/) v20+ para rodar.

- Configure as variáveis de ambiente
- Instale as dependências e execute para ver em sua máquina.

```sh
cd light-back
npm install
npm run migrate:dev
npm run dev
```

Para o ambiente de produção: (está configurado pra utilizar o github pages)

```sh
npm run build
npm run start
```
