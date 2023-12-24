import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3000),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_S3_BUCKET_NAME: z.string(),
});

const _parsedEnv = envSchema.safeParse(process.env);

if (_parsedEnv.success === false) {
  console.error('❌ Invalid environment variables', _parsedEnv.error.format());

  throw new Error('Invalid environment variables.');
}

export const serverEnv = _parsedEnv.data;
