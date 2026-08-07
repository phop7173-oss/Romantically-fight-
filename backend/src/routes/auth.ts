import { Router } from 'express';
import { registerSchema, loginSchema, inviteSchema, acceptInvitationSchema } from '../validation/auth.js';
import { registerUser, loginUser, createInvitation, acceptInvitation } from '../services/auth.js';
import { requireAuth } from '../middleware/auth.js';
import { toApiError } from '../utils/errors.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const parsed = registerSchema.parse(req.body);
    const result = await registerUser(parsed as { name: string; email: string; password: string });
    return res.status(201).json(result);
  } catch (error) {
    const payload = toApiError(error, 'Invalid registration payload.');
    return res.status(400).json({ message: payload.message, code: payload.code });
  }
});

router.post('/login', async (req, res) => {
  try {
    const parsed = loginSchema.parse(req.body);
    const result = await loginUser(parsed as { email: string; password: string });
    return res.json(result);
  } catch (error) {
    const payload = toApiError(error, 'Invalid login payload.');
    return res.status(401).json({ message: payload.message, code: payload.code });
  }
});

router.post('/invites', requireAuth, async (req, res) => {
  try {
    const parsed = inviteSchema.parse(req.body);
    const result = await createInvitation(req.user!.id, parsed.email);
    return res.status(201).json(result);
  } catch (error) {
    const payload = toApiError(error, 'Invalid invite payload.');
    return res.status(400).json({ message: payload.message, code: payload.code });
  }
});

router.post('/invites/accept', requireAuth, async (req, res) => {
  try {
    const parsed = acceptInvitationSchema.parse(req.body);
    const result = await acceptInvitation({ token: parsed.token, userId: req.user!.id });
    return res.json(result);
  } catch (error) {
    const payload = toApiError(error, 'Invalid invite acceptance payload.');
    return res.status(400).json({ message: payload.message, code: payload.code });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  return res.json({ user: req.user });
});

export default router;
