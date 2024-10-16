import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config';
import type { Tourist } from '../models/Tourist';
import type { TravelAgency } from '../models/TravelAgency';
import type { UserWithRelations } from '../models/User';

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

  let additionalData = {} as
    | Omit<Tourist, 'userId' | 'touristId'>
    | Omit<TravelAgency, 'userId' | 'travelAgencyId'>;

  if (tourist) {
    const { userId, touristId, ...dataTourist } = tourist;
    additionalData = dataTourist;
  }

  if (travelAgency) {
    const { userId, travelAgencyId, ...dataTravelAgency } = travelAgency;
    additionalData = dataTravelAgency;
  }

  return {
    token: signToken({ userId, username, email }),
    data: { username, email, phoneNumber, ...additionalData, ...otherUserData }
  };
};
