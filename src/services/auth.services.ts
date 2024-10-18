import type { Tourist, TravelAgency } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config';
import type { UserWithRelations } from '../schemas/login.schema';

export interface AuthPayload {
  touristId?: number;
  travelAgencyId?: number;
  username?: string;
  email?: string;
}

export const signToken = (payload: AuthPayload): string => {
  return jwt.sign(payload, SECRET_JWT_KEY, { expiresIn: '2h' });
};

export const verifyToken = (token: string): AuthPayload => {
  const result = jwt.verify(token, SECRET_JWT_KEY);
  if (result && typeof result === 'string') {
    throw new Error('Invalid token');
  }
  return result as AuthPayload;
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

  let token = '';

  if (tourist) {
    const { userId, touristId, ...dataTourist } = tourist;
    dataAsTouristOrAgency = dataTourist;
    token = signToken({ touristId, username, email });
  }

  if (travelAgency) {
    const { userId, travelAgencyId, ...dataTravelAgency } = travelAgency;
    dataAsTouristOrAgency = dataTravelAgency;
    token = signToken({ travelAgencyId, username, email });
  }

  return {
    token,
    data: {
      username,
      email,
      phoneNumber,
      ...dataAsTouristOrAgency,
      ...otherUserData
    }
  };
};
