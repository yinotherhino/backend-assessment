import { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  if (err instanceof CustomError) {
    message = err.message;
    statusCode = err.statusCode;
  }
  res.status(statusCode).json({
    success: false,
    error: message,
  });

  console.error(err.stack);
  console.error(`Error: ${message}, Status Code: ${statusCode}, path: ${req.path}, query: ${req.query}, auth: ${Boolean(req.headers.authorization)}`);
};
