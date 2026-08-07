declare module 'express' {
  interface Request {
    user?: {
      id: number;
      email: string;
      coupleId: number | null;
    };
  }
}
