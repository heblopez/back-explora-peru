import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import type { TouristEntry } from '../models/Tourist';
import type { TravelAgencyEntry } from '../models/TravelAgency';
import type { UserEntry } from '../models/User';
import { createTravelAgency } from '../services/agency.services';
import { createAuthResponse } from '../services/auth.services';
import { createTourist } from '../services/tourist.services';
import { findUserByEmail } from '../services/user.services';
import type { LoginEntry } from '../validators/login.schema';

export const registerTourist = async (req: Request, res: Response) => {
  try {
    const dataNewTourist = req.body as TouristEntry & UserEntry;

    const { email, password, phoneNumber, ...dataTourist } = dataNewTourist;

    const newTourist = await createTourist(
      { email, password, phoneNumber },
      dataTourist
    );

    res.status(201).json({
      message: 'Tourist registered successfully!',
      data: newTourist
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

    const resAuth = createAuthResponse(user);
    res.status(200).json({
      message: 'User logged in successfully!',
      ...resAuth
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

export const registerTravelAgency = async (req: Request, res: Response) => {
  try {
    const dataNewTravelAgency = req.body as TravelAgencyEntry & UserEntry;
    const { email, password, phoneNumber, ...dataTravelAgency } =
      dataNewTravelAgency;

    const newTravelAgency = await createTravelAgency(
      { email, password, phoneNumber },
      dataTravelAgency
    );

    res.status(201).json({
      message: 'Travel Agency registered successfully!',
      data: newTravelAgency
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: [{ message: 'Error at registering the travel agency' }]
    });
  }
};
