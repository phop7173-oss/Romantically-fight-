declare module 'bcryptjs' {
  export function hash(password: string, salt: number): Promise<string>;
  export function compare(password: string, hash: string): Promise<boolean>;
  const bcrypt: typeof import('bcryptjs');
  export default bcrypt;
}
