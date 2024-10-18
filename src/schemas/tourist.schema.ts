import type { Tourist, User } from '@prisma/client';
import { z } from 'zod';

export const newTouristSchema = z.object({
  firstName: z
    .string()
    .min(2, 'The name is required and must be at least 2 characters long'),
  lastName: z
    .string()
    .min(2, 'The last name is required and must be at least 2 characters long'),
  documentType: z.enum(['DNI', 'PASSPORT', 'CE']),
  documentNumber: z
    .string({ invalid_type_error: 'The document number must be a string' })
    .min(8, 'The document number must be at least 8 digits long'),
  birthdate: z.string().date('The birthdate must have the format YYYY-MM-DD'),
  country: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  phoneNumber: z
    .string({ invalid_type_error: 'The phone number must be a string' })
    .min(1, 'The phone number is required')
    .min(11, 'The phone number must be at least 11 characters long'),
  email: z
    .string()
    .min(1, 'The email is required')
    .email('The email must have a valid email format'),
  password: z
    .string()
    .min(1, 'The password is required')
    .min(7, 'The password must be at least 7 characters long')
    .max(24, 'The password must have maximum 24 characters')
});

export type TouristEntry = z.infer<typeof newTouristSchema>;

export type ResRegisteredTourist = Omit<
  User & Tourist,
  'userId' | 'touristId' | 'password'
>;
