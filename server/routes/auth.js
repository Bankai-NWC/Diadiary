import express from 'express';

import admin from '../firebase.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/firebase-auth', async (req, res) => {
  const { idToken } = req.body;

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const {
      uid,
      email,
      name = '',
      picture = '',
      firebase: { sign_in_provider } = {},
    } = decoded;

    const isGoogle = sign_in_provider === 'google.com';
    const isEmail = sign_in_provider === 'password';

    const [firstName, ...rest] = name.trim().split(' ');
    const surname = rest.join(' ');

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        googleID: isGoogle ? uid : null,
        name: firstName,
        surname,
        gender: '',
        dateOfIllness: null,
        password: isEmail ? 'firebase_managed' : '',
        avatarUrl: picture,
        longActingInsulin: '',
        rapidActingInsulin: '',
        anamnesis: '',
        сreatedAt: new Date(),
      });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

export default router;
