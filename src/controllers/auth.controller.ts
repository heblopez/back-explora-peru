import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import type { TouristEntry } from '../models/Tourist';
import type { UserEntry } from '../models/User';
import { createTourist } from '../services/tourist.services';
import { createUser, findUserByEmail } from '../services/user.services';
import type { LoginEntry } from '../validators/login.schema';

export const registerTourist = async (req: Request, res: Response) => {
  try {
    const dataNewTourist = req.body as TouristEntry & UserEntry;

    const { email, password, phoneNumber, ...dataTourist } = dataNewTourist;

    const dataUser = {
      email,
      password,
      phoneNumber
    };

    const { userId, ...dataUserWithoutId } = await createUser(dataUser);
    const newTourist = await createTourist(userId, dataTourist);

    res.status(201).json({
      message: 'Tourist registered successfully!',
      data: { ...dataUserWithoutId, ...newTourist }
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errors: [{ message: 'Error at registering the tourist' }] });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginEntry;

    const user = await findUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error('Incorrect password');
    }

    const { password: _, userId, ...dataUserLoggedIn } = user;

    res.status(200).json({
      message: 'User logged in successfully!',
      data: dataUserLoggedIn
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({
        errors: [{ message: `Error at logging: ${error.message}` }]
      });
    }
  }
};
