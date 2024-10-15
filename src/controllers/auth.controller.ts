import type { Request, Response } from 'express';
import type { TouristEntry } from '../models/Tourist';
import type { UserEntry } from '../models/User';
import { createTourist } from '../services/tourist.services';
import { createUser } from '../services/user.services';

export const registerTourist = async (req: Request, res: Response) => {
  try {
    const dataNewTourist = req.body as TouristEntry & UserEntry;

    const { email, password, phoneNumber, ...dataTourist } = dataNewTourist;

    if (!email || !password || !phoneNumber) {
      res.status(400).json({ message: 'Missing required fields' });
    }

    const dataUser = {
      email,
      password,
      phoneNumber
    };

    const { userId, ...dataUserWithoutId } = await createUser(dataUser);
    const newTourist = await createTourist(userId, dataTourist);

    res.status(201).json({
      message: 'Registered successfully',
      data: { ...dataUserWithoutId, ...newTourist }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};
