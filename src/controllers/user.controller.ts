import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/verifyAuthRequest';
import { findTravelAgencyById } from '../services/agency.services';
import { findTouristById } from '../services/tourist.services';
import { updateUser } from '../services/user.services';

export const updateUserData = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    let userId = 0;

    if (req.touristId) {
      const tourist = await findTouristById(req.touristId);
      userId = tourist.userId;
    }

    if (req.travelAgencyId) {
      const travelAgency = await findTravelAgencyById(req.travelAgencyId);
      userId = travelAgency.userId;
    }

    if (!userId) throw new Error('User not found');

    const updatedUser = await updateUser(userId, data);
    const { password, ...resUpdatedUser } = updatedUser;

    res.status(200).json({
      message: 'User updated successfully!',
      data: resUpdatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: [{ message: 'Error at trying to update the user' }]
    });
  }
};
