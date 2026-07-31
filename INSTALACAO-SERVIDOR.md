# Instalação do site Cognixs.ai

## Requisitos

- Servidor Linux
- Node.js 22.13 ou superior
- NPM
- Nginx, caso queira usar domínio e HTTPS

## Instalação

Entre na pasta descompactada e execute:

```bash
npm ci
npm run build
npm run start
```

O comando `npm run start` mantém a aplicação em execução. Em produção,
utilize um gerenciador de processos como PM2 ou um serviço systemd para
reiniciá-la automaticamente.

## Executar com PM2

```bash
npm install -g pm2
pm2 start npm --name cognixs-ai -- run start
pm2 save
pm2 startup
```

Execute também o comando adicional exibido pelo `pm2 startup`.

## Publicar com domínio

Configure o Nginx como proxy reverso para a porta apresentada pelo comando
`npm run start`. Depois, use o Certbot para ativar HTTPS no domínio.

## Observação

O pacote não inclui `node_modules`, arquivos compilados ou o histórico do Git.
As dependências serão instaladas pelo comando `npm ci`.
