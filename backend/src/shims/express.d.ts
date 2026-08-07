declare module 'express' {
  export interface Request {
    headers: any;
    user?: any;
  }
  export interface Response {
    status(code: number): any;
    json(body: any): any;
  }
  export interface NextFunction {}
  export function Router(): any;
  export function json(): any;
  export function application(): any;
  const express: any;
  export default express;
}
