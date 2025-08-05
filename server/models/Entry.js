import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  time: { type: String, required: true }, // e.g., "08:00"
  glucose: { type: Number, required: true }, // mmol/L
  bolusInsulin: { type: Number, default: 0 }, // units
  basalInsulin: { type: Number, default: 0 }, // units
  breadUnits: { type: Number, default: 0 }, // e.g., 2.5
  activity: { type: String, default: '' }, // e.g., "Running"
  activityDuration: { type: Number, default: 0 }, // minutes
  symptoms: { type: String, default: '' }, // e.g., "Feeling good"
  notes: { type: String, default: '' }, // Additional notes
  characterizedBy: { type: String, default: '' }, // e.g., "Normal", "High", "Low"
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Entry', entrySchema);
