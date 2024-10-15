import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { User, UserEntry } from '../models/User';

const prisma = new PrismaClient();

export const createUser = async (
  data: UserEntry
): Promise<Omit<User, 'password'>> => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        username: crypto.randomUUID(),
        email: data.email,
        password: hashedPassword,
        phoneNumber: data.phoneNumber,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error(error);
    throw new Error('Error while creating the user');
  }
};
