import { app } from './app';
import { serverEnv } from './env';
import { prisma } from './lib/prisma';
import cors from '@fastify/cors';

app.register(cors, {
  origin: '*',
});

app
  .listen({
    host: '0.0.0.0',
    port: serverEnv.PORT,
  })
  .then(() => {
    console.log(`💡 HTTP Server Running on port ${serverEnv.PORT}`);
  });

/**
   Este bloco impede que a aplicação fique indisponível
   para erros não tratados e exceções conhecidas.

   https://github.com/ErickWendel/graceful-shutdown-yt/blob/main/recorded/src/index.js
  */
function gracefulShutdown(event: string) {
  return (code: number) => {
    console.log(`${event} received! with ${code}`);

    app.close(async () => {
      console.log('http server closed');
      console.log('Closing DB connection...');
      await prisma.$disconnect();
      console.log('DB connection closed');
      process.exit(code);
    });
  };
}

// Disparado no Ctrl + C no terminal -> multi plataforma
process.on('SIGINT', gracefulShutdown('SIGINT'));

// Disparado no kill
process.on('SIGTERM', gracefulShutdown('SIGTERM'));

process.on('exit', (code) => {
  console.log('exit signal received', code);
});
