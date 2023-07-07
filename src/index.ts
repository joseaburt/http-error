export type ErrorInfo = {
  ctx: any;
  code: string;
  status: number;
  message: string;
};

export type CreateErrorOption = {
  ctx?: any;
  code: string;
  status: number;
  message: string;
};

export default class HttpError extends Error {
  public readonly ctx: any;
  public readonly code: string;
  public readonly status: number;

  constructor(status: number, code: string, message: string, ctx?: any) {
    super(message);
    this.ctx = ctx;
    this.code = code;
    this.status = status;
  }

  public static create(options: CreateErrorOption): HttpError {
    return new HttpError(options.status, options.code, options.message, options.ctx);
  }

  public static parse(error: any): ErrorInfo {
    const status = 'status' in error ? (error.status as number) : 500;
    const code = 'code' in error ? (error.code as string) : 'ServerError';
    const ctx = 'ctx' in error ? (error.ctx as any) : {};
    const message = 'message' in error ? (error.message as any) : {};
    return { code, message: message, status, ctx };
  }
}
