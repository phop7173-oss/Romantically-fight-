import cors from 'cors';
import express from 'express';
import authRouter from './routes/auth.js';
import couplesRouter from './routes/couples.js';
import healthRouter from './routes/health.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/health', healthRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/couples', couplesRouter);

  return app;
}
