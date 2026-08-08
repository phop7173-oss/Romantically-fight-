import { prisma } from '../lib/prisma.js';

export type DashboardResponse = {
  coupleName: string;
  anniversaryDate: string | null;
  nextDate: {
    title: string;
    scheduledAt: string;
    details: string | null;
  } | null;
};

export async function getCoupleDashboard(coupleId: number): Promise<DashboardResponse> {
  const couple = await prisma.couple.findUnique({
    where: { id: coupleId },
    select: {
      name: true,
      anniversaryDate: true,
      dates: {
        where: {
          scheduledAt: {
            gte: new Date(),
          },
        },
        orderBy: { scheduledAt: 'asc' },
        take: 1,
        select: {
          title: true,
          scheduledAt: true,
          details: true,
        },
      },
    },
  });

  if (!couple) {
    throw new Error('Couple not found.');
  }

  return {
    coupleName: couple.name,
    anniversaryDate: couple.anniversaryDate ? couple.anniversaryDate.toISOString() : null,
    nextDate: couple.dates.length
      ? {
          title: couple.dates[0].title,
          scheduledAt: couple.dates[0].scheduledAt.toISOString(),
          details: couple.dates[0].details,
        }
      : null,
  };
}
