import admin from '../firebase.js';
import User from '../models/User.js';

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token found' });
  }

  const idToken = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (!decodedToken.email) {
      return res.status(401).json({ message: 'No email in token' });
    }

    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      return res.status(401).json({ message: 'User not found in database' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default verifyFirebaseToken;
