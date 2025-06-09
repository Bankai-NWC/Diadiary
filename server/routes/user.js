import express from 'express';

import authMiddleware from '../middleware/verifyFirebaseToken.js';
import User from '../models/User.js';

const router = express.Router();

router.patch('/update', authMiddleware, async (req, res) => {
  try {
    const updateFields = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      { $set: updateFields },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile successfully updated',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error during update' });
  }
});

export default router;
