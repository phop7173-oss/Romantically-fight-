import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, async (_req, res) => {
  const couples = await prisma.couple.findMany({
    include: { members: true },
    orderBy: { createdAt: 'desc' },
  });

  res.json(couples);
});

router.post('/', requireAuth, async (req, res) => {
  const { name } = req.body as { name?: string };

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'A couple name is required.' });
  }

  const couple = await prisma.couple.create({
    data: {
      name,
    },
    include: { members: true },
  });

  return res.status(201).json(couple);
});

export default router;
