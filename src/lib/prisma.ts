import { serverEnv } from '@/env';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: serverEnv.NODE_ENV === 'dev' ? ['error', 'query'] : [],
});
