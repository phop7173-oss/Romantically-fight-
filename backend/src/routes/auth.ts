import { Router } from 'express';
import { registerSchema, loginSchema, inviteSchema, acceptInvitationSchema } from '../validation/auth';
import { registerUser, loginUser, createInvitation, acceptInvitation } from '../services/auth';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const parsed = registerSchema.parse(req.body);
    const result = await registerUser(parsed as { name: string; email: string; password: string });
    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: 'Invalid registration payload.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const parsed = loginSchema.parse(req.body);
    const result = await loginUser(parsed as { email: string; password: string });
    return res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ error: error.message });
    }
    return res.status(401).json({ error: 'Invalid login payload.' });
  }
});

router.post('/invites', requireAuth, async (req, res) => {
  try {
    const parsed = inviteSchema.parse(req.body);
    const result = await createInvitation(req.user!.id, parsed.email);
    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: 'Invalid invite payload.' });
  }
});

router.post('/invites/accept', requireAuth, async (req, res) => {
  try {
    const parsed = acceptInvitationSchema.parse(req.body);
    const result = await acceptInvitation({ token: parsed.token, userId: req.user!.id });
    return res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: 'Invalid invite acceptance payload.' });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  return res.json({ user: req.user });
});

export default router;
