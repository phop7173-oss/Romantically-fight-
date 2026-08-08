import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getCoupleDashboard } from '../services/dashboard.js';
import { toApiError } from '../utils/errors.js';

const router = Router();

router.get('/me/dashboard', requireAuth, async (req, res) => {
  if (!req.user?.coupleId) {
    return res.status(400).json({ message: 'User does not belong to an active couple.' });
  }

  try {
    const dashboard = await getCoupleDashboard(req.user.coupleId);
    return res.json(dashboard);
  } catch (error) {
    const payload = toApiError(error, 'Unable to load dashboard.');
    return res.status(400).json({ message: payload.message, code: payload.code });
  }
});

export default router;
