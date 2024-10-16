import { z } from 'zod';

export const newTravelAgencySchema = z.object({
  agencyName: z
    .string()
    .min(2, 'The name is required and must be at least 2 characters long'),
  agencyDescription: z.string().optional(),
  ruc: z
    .string({ invalid_type_error: 'The RUC must be a string' })
    .length(11, 'The RUC must be 11 characters long'),
  address: z
    .string()
    .min(1, 'The address is required')
    .refine((value) => {
      const regex = /^[a-zA-Z0-9\s.,'-/#]+$/;
      return regex.test(value);
    }, 'The address does not have a valid format'),
  website: z
    .string()
    .refine((value) => {
      const regex =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/;

      return regex.test(value);
    }, 'The website does not have a valid format')
    .optional()
});
