import crypto from 'node:crypto';
import { type Prisma, PrismaClient, type User } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { UserWithRelations } from '../schemas/login.schema';

const prisma = new PrismaClient();

/* NOTE: Currently, this function is not used because the user is created with the register-tourist and register-agency routes */
export const createUser = async (data: {
  email: string;
  password: string;
  phoneNumber: string;
}): Promise<Omit<User, 'password'>> => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        username: crypto.randomUUID(),
        email: data.email,
        password: hashedPassword,
        phoneNumber: data.phoneNumber
      }
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error(error);
    throw new Error('Error while creating the user');
  }
};
/* End of the note */

export const findUserByEmail = async (
  email: string
): Promise<UserWithRelations> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      },
      include: {
        tourist: true,
        travelAgency: true
      }
    });

    if (!user) {
      throw new Error('Error at finding the user by email');
    }

    return user as UserWithRelations;
  } catch (error) {
    console.error(error);
    throw new Error('No user found with the given email');
  }
};

export const updateUser = async (
  userId: number,
  data: Prisma.UserUpdateInput,
  withTourist = true,
  withTravelAgency = true
) => {
  try {
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password as string, 10);
      data.password = hashedPassword;
    }

    const user = await prisma.user.update({
      data,
      where: { userId },
      include: {
        tourist: withTourist,
        travelAgency: withTravelAgency
      }
    });

    if (!user) {
      throw new Error('User to update not found');
    }

    return user as UserWithRelations;
  } catch (error) {
    console.error(error);
    throw new Error('Error at updating the user');
  }
};
