import express from 'express';
import LabResults from '../models/LabResults.js';
import verifyFirebaseToken from '../middleware/verifyFirebaseToken.js';

const router = express.Router();

// ➕ Створити новий аналіз
router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const newResult = new LabResults({ ...req.body, userId });
    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (err) {
    res.status(500).json({ error: 'Error creating lab result' });
  }
});

// 📥 Отримати всі аналізи користувача
router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const results = await LabResults.find({ userId }).sort({ date: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching lab results' });
  }
});

// ✏️ Оновити конкретний аналіз
router.patch('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const updated = await LabResults.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Lab result not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating lab result' });
  }
});

// ❌ Видалити аналіз
router.delete('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const deleted = await LabResults.findOneAndDelete({ _id: req.params.id, userId });
    if (!deleted) {
      return res.status(404).json({ error: 'Lab result not found' });
    }
    res.json({ message: 'Lab result deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting lab result' });
  }
});

export default router;
