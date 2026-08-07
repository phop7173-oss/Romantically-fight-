import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import couplesRouter from './routes/couples';
import authRouter from './routes/auth';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'romantically-fight-api' });
});

app.use('/api/auth', authRouter);
app.use('/api/couples', couplesRouter);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
