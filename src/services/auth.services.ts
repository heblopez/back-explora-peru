import type { Tourist, TravelAgency } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config';
import type { UserWithRelations } from '../schemas/login.schema';

export const signToken = (payload: Record<string, unknown>) => {
  return jwt.sign(payload, SECRET_JWT_KEY, { expiresIn: '2h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_JWT_KEY);
};

export const createAuthResponse = (user: UserWithRelations) => {
  const {
    userId,
    username,
    email,
    password,
    phoneNumber,
    tourist,
    travelAgency,
    ...otherUserData
  } = user;

  let dataAsTouristOrAgency = {} as
    | Omit<Tourist, 'userId' | 'touristId'>
    | Omit<TravelAgency, 'userId' | 'travelAgencyId'>;

  if (tourist) {
    const { userId, touristId, ...dataTourist } = tourist;
    dataAsTouristOrAgency = dataTourist;
  }

  if (travelAgency) {
    const { userId, travelAgencyId, ...dataTravelAgency } = travelAgency;
    dataAsTouristOrAgency = dataTravelAgency;
  }

  return {
    token: signToken({ userId, username, email }),
    data: {
      username,
      email,
      phoneNumber,
      ...dataAsTouristOrAgency,
      ...otherUserData
    }
  };
};
