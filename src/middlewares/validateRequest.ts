import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';

export const validateRequest =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.safeParse(req.body);

    if (error) {
      res.status(400).json({
        errors: error.errors.map((e) => ({
          field: e.path[0],
          message: e.message
        }))
      });
      return;
    }

    next();
  };
