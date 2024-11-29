import { NextFunction, Request, Response } from "express";
import Joi, { Schema } from "joi";
import { CustomError } from "../utils/error";

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params || req.body || req.query, {
      abortEarly: false,
    });

    if (error) {
      const message = error.details.map((detail) => detail.message).join(", ");
      return next(new CustomError(`Validation Error: ${message}`, 400));
    }

    next();
  };
};
