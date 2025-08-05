import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleID: { type: String, default: null },
  name: { type: String, default: '' },
  surname: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: '' }, // Firebase-managed
  gender: { type: String, default: '' },
  dateOfIllness: { type: Date, default: null },
  bolusInsulin: { type: String, default: '' },
  basalInsulin: { type: String, default: '' },
  anamnesis: { type: String, default: '' },
  сreatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
