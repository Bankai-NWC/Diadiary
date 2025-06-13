import mongoose from 'mongoose';

const labResultsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  hba1c: { type: Number, required: true }, // e.g., 7.5
  cholesterolTotal: { type: Number, default: 0 }, // mg/dL
  cholesterolHDL: { type: Number, default: 0 }, // mg/dL
  cholesterolLDL: { type: Number, default: 0 }, // mg/dL
  triglycerides: { type: Number, default: 0 }, // mg/dL
  creatinine: { type: Number, default: 0 }, // mg/dL
  notes: { type: String, default: '' }, // Additional notes
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('LabResults', labResultsSchema);