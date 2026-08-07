import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret';
const TOKEN_TTL = '7d';

export async function registerUser(input: { name: string; email: string; password: string }) {
  const existing = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
  if (existing) {
    throw new Error('Email already registered.');
  }

  const passwordHash = await bcrypt.hash(input.password, 10);
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email.toLowerCase(),
      passwordHash,
    },
  });

  const token = signToken(user.id);
  return { user: sanitizeUser(user), token };
}

export async function loginUser(input: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const isValid = await bcrypt.compare(input.password, user.passwordHash);
  if (!isValid) {
    throw new Error('Invalid email or password.');
  }

  const token = signToken(user.id);
  return { user: sanitizeUser(user), token };
}

export async function createInvitation(actorId: number, email: string) {
  const target = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!target) {
    throw new Error('Invitee must already have an account.');
  }

  const actor = await prisma.user.findUnique({ where: { id: actorId } });
  if (!actor) {
    throw new Error('Actor not found.');
  }

  if (actor.coupleId) {
    throw new Error('You already have an active couple.');
  }

  if (target.coupleId) {
    throw new Error('Invitee already belongs to a couple.');
  }

  const token = crypto.randomBytes(24).toString('hex');
  const invitation = await prisma.invitation.create({
    data: {
      token,
      inviterId: actorId,
      inviteeId: target.id,
      status: 'PENDING',
    },
  });

  return { invitation };
}

export async function acceptInvitation(input: { token: string; userId: number }) {
  const invitation = await prisma.invitation.findUnique({ where: { token: input.token } });
  if (!invitation) {
    throw new Error('Invitation not found.');
  }

  if (invitation.status !== 'PENDING') {
    throw new Error('Invitation is no longer valid.');
  }

  const user = await prisma.user.findUnique({ where: { id: input.userId } });
  if (!user) {
    throw new Error('User not found.');
  }

  if (user.coupleId) {
    throw new Error('You already have an active couple.');
  }

  const inviter = await prisma.user.findUnique({ where: { id: invitation.inviterId } });
  if (!inviter) {
    throw new Error('Inviter not found.');
  }

  if (inviter.coupleId) {
    throw new Error('Inviter already belongs to a couple.');
  }

  const couple = await prisma.couple.create({
    data: {
      name: `${inviter.name} & ${user.name}`,
      members: {
        connect: [{ id: inviter.id }, { id: user.id }],
      },
    },
  });

  await prisma.user.updateMany({
    where: { id: { in: [inviter.id, user.id] } },
    data: { coupleId: couple.id },
  });

  await prisma.invitation.update({
    where: { id: invitation.id },
    data: { status: 'ACCEPTED' },
  });

  return { couple };
}

function signToken(userId: number) {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

function sanitizeUser(user: { id: number; name: string; email: string; coupleId: number | null; createdAt: Date; updatedAt: Date }) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    coupleId: user.coupleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
