import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret';

export async function requireAuth(req: any, res: any, next: any) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const token = header.slice('Bearer '.length);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as { sub: number };
    const user = await prisma.user.findUnique({ where: { id: decoded.sub } });
    if (!user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    req.user = { id: user.id, email: user.email, coupleId: user.coupleId };
    return next();
  } catch {
    return res.status(401).json({ error: 'Authentication required.' });
  }
}

