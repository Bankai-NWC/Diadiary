import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  time: { type: String, required: true }, // e.g., "08:00"
  glucose: { type: Number, required: true }, // mg/dL
  insulin: { type: Number, default: 0 }, // units
  breadUnits: { type: Number, default: 0 }, // e.g., 2.5
  weight: { type: Number, default: 0 }, // kg
  activity: { type: String, default: '' }, // e.g., "Running"
  activityDuration: { type: Number, default: 0 }, // minutes
  symptoms: { type: String, default: '' }, // e.g., "Feeling good"
  notes: { type: String, default: '' }, // Additional notes
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Entry', entrySchema);
