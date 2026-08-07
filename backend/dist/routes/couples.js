import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { toApiError } from '../utils/errors.js';
const router = Router();
router.get('/', requireAuth, async (_req, res) => {
    try {
        const couples = await prisma.couple.findMany({
            include: { members: true },
            orderBy: { createdAt: 'desc' },
        });
        return res.json(couples);
    }
    catch (error) {
        const payload = toApiError(error, 'Unable to load couples.');
        return res.status(500).json({ message: payload.message, code: payload.code });
    }
});
router.post('/', requireAuth, async (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'A couple name is required.' });
    }
    try {
        const couple = await prisma.couple.create({
            data: {
                name,
            },
            include: { members: true },
        });
        return res.status(201).json(couple);
    }
    catch (error) {
        const payload = toApiError(error, 'Unable to create couple.');
        return res.status(500).json({ message: payload.message, code: payload.code });
    }
});
export default router;
