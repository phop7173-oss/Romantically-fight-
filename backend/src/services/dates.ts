import { prisma } from '../lib/prisma.js';

type DateInput = {
  title: string;
  scheduledAt: Date;
  details?: string | null;
};

type DateRecord = {
  id: number;
  title: string;
  scheduledAt: Date;
  details: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

function serializeDate(date: DateRecord) {
  return {
    id: date.id,
    title: date.title,
    scheduledAt: date.scheduledAt.toISOString(),
    details: date.details,
    status: date.status,
    createdAt: date.createdAt.toISOString(),
    updatedAt: date.updatedAt.toISOString(),
  };
}

export async function listCoupleDates(coupleId: number) {
  const dates = await prisma.date.findMany({
    where: { coupleId },
    orderBy: { scheduledAt: 'asc' },
  });

  return dates.map(serializeDate);
}

export async function createCoupleDate(coupleId: number, input: DateInput) {
  const date = await prisma.date.create({
    data: {
      coupleId,
      title: input.title,
      scheduledAt: input.scheduledAt,
      details: input.details ?? null,
    },
  });

  return serializeDate(date);
}

export async function updateCoupleDate(coupleId: number, id: number, input: Partial<DateInput>) {
  const existing = await prisma.date.findFirst({ where: { id, coupleId } });
  if (!existing) {
    return null;
  }

  const date = await prisma.date.update({
    where: { id },
    data: {
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.scheduledAt !== undefined ? { scheduledAt: input.scheduledAt } : {}),
      ...(input.details !== undefined ? { details: input.details } : {}),
    },
  });

  return serializeDate(date);
}

export async function deleteCoupleDate(coupleId: number, id: number) {
  const existing = await prisma.date.findFirst({ where: { id, coupleId } });
  if (!existing) {
    return false;
  }

  await prisma.date.delete({ where: { id } });
  return true;
}
