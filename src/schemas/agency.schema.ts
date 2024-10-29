import type { TravelAgency, User } from '@prisma/client';
import { z } from 'zod';

export const newTravelAgencySchema = z.object({
  email: z
    .string()
    .min(1, 'The email is required')
    .email('The email must have a valid email format'),
  password: z
    .string()
    .min(1, 'The password is required')
    .min(7, 'The password must be at least 7 characters long')
    .max(24, 'The password must have maximum 24 characters'),
  agencyName: z
    .string()
    .min(2, 'The name is required and must be at least 2 characters long'),
  agencyDescription: z
    .string()
    .max(500, 'The description must have maximum 500 characters')
    .optional(),
  ruc: z
    .string({ invalid_type_error: 'The RUC must be a string' })
    .length(11, 'The RUC must be 11 characters long'),
  phoneNumber: z
    .string({ invalid_type_error: 'The phone number must be a string' })
    .min(1, 'The phone number is required')
    .min(11, 'The phone number must be at least 11 characters long'),
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

export type TravelAgencyEntry = z.infer<typeof newTravelAgencySchema>;

export type ResRegisteredAgency = Omit<
  User & TravelAgency,
  'userId' | 'travelAgencyId' | 'password'
>;
