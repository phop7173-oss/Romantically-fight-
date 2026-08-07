import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { z } from 'zod';

const backendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const prismaDir = path.resolve(backendRoot, 'prisma');

dotenv.config({ path: path.resolve(backendRoot, '.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().default('file:./dev.db'),
  JWT_SECRET: z.string().default('dev-secret'),
  DB_PROVIDER: z.enum(['sqlite', 'postgresql']).default('sqlite'),
});

function resolveDatabaseUrl(rawUrl: string) {
  if (!rawUrl.startsWith('file:')) {
    return rawUrl;
  }

  const suffix = rawUrl.slice('file:'.length);
  if (!suffix || suffix.startsWith('/')) {
    return rawUrl;
  }

  if (suffix.startsWith('./') || suffix.startsWith('../')) {
    return `file:${path.resolve(prismaDir, suffix)}`;
  }

  return `file:${path.resolve(prismaDir, suffix)}`;
}

const parsedEnv = envSchema.parse(process.env);

export const env = {
  ...parsedEnv,
  DATABASE_URL: resolveDatabaseUrl(parsedEnv.DATABASE_URL),
};
