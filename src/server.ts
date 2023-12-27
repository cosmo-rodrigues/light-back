import { app } from './app';
import { serverEnv } from './env';

app
  .listen({
    host: '0.0.0.0',
    port: serverEnv.PORT,
  })
  .then(() => {
    console.log(`💡 HTTP Server Running on port ${serverEnv.PORT}`);
  });
