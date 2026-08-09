import { z } from 'zod';

export const createDateSchema = z.object({
  title: z.string().trim().min(1, 'A title is required.').max(200, 'Title must be 200 characters or fewer.'),
  scheduledAt: z.coerce.date(),
  details: z.string().trim().max(2000, 'Details must be 2000 characters or fewer.').nullable().optional(),
});

export const updateDateSchema = z
  .object({
    title: z.string().trim().min(1, 'A title is required.').max(200, 'Title must be 200 characters or fewer.'),
    scheduledAt: z.coerce.date(),
    details: z.string().trim().max(2000, 'Details must be 2000 characters or fewer.').nullable(),
  })
  .partial();

export const dateIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});
