import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createDateSchema, updateDateSchema, dateIdSchema } from '../validation/dates.js';
import { listCoupleDates, createCoupleDate, updateCoupleDate, deleteCoupleDate } from '../services/dates.js';
import { toApiError } from '../utils/errors.js';

const router = Router();

function requireCouple(req: any, res: any, next: any) {
  if (!req.user?.coupleId) {
    return res.status(400).json({ message: 'User does not belong to an active couple.' });
  }
  return next();
}

router.get('/me/dates', requireAuth, requireCouple, async (req, res) => {
  try {
    const dates = await listCoupleDates(req.user.coupleId);
    return res.json(dates);
  } catch (error) {
    const payload = toApiError(error, 'Unable to load dates.');
    return res.status(400).json({ message: payload.message, code: payload.code });
  }
});

router.post('/me/dates', requireAuth, requireCouple, async (req, res) => {
  try {
    const parsed = createDateSchema.parse(req.body) as { title: string; scheduledAt: Date; details?: string | null };
    const date = await createCoupleDate(req.user.coupleId, parsed);
    return res.status(201).json(date);
  } catch (error) {
    const payload = toApiError(error, 'Unable to create date.');
    return res.status(400).json({ message: payload.message, code: payload.code });
  }
});

router.patch('/me/dates/:id', requireAuth, requireCouple, async (req, res) => {
  try {
    const { id } = dateIdSchema.parse(req.params);
    const parsed = updateDateSchema.parse(req.body) as Partial<{ title: string; scheduledAt: Date; details?: string | null }>;
    const date = await updateCoupleDate(req.user.coupleId, id, parsed);
    if (!date) {
      return res.status(404).json({ message: 'Date not found.' });
    }
    return res.json(date);
  } catch (error) {
    const payload = toApiError(error, 'Unable to update date.');
    return res.status(400).json({ message: payload.message, code: payload.code });
  }
});

router.delete('/me/dates/:id', requireAuth, requireCouple, async (req, res) => {
  try {
    const { id } = dateIdSchema.parse(req.params);
    const deleted = await deleteCoupleDate(req.user.coupleId, id);
    if (!deleted) {
      return res.status(404).json({ message: 'Date not found.' });
    }
    return res.status(204).send();
  } catch (error) {
    const payload = toApiError(error, 'Unable to delete date.');
    return res.status(400).json({ message: payload.message, code: payload.code });
  }
});

export default router;
