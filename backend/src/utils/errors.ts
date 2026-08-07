import { Prisma } from '@prisma/client';

export type ApiErrorPayload = {
  message: string;
  code?: string;
};

export function toApiError(error: unknown, fallbackMessage: string): ApiErrorPayload {
  if (error instanceof Error) {
    return { message: error.message };
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return { message: 'A conflicting record already exists.', code: error.code };
    }

    if (error.code === 'P2025') {
      return { message: 'The requested resource was not found.', code: error.code };
    }

    return { message: 'A database operation failed.', code: error.code };
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return { message: 'The provided data was invalid.', code: 'VALIDATION_ERROR' };
  }

  return { message: fallbackMessage };
}
