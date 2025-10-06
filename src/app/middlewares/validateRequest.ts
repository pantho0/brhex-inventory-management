import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';

const validateRequest = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
