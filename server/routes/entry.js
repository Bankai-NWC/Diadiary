import express from 'express';
import Entry from '../models/Entry.js';
import verifyFirebaseToken from '../middleware/verifyFirebaseToken.js';

const router = express.Router();

router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const newEntry = new Entry({ ...req.body, userId });
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(500).json({ error: 'Error creating a new entry', details: err.message });
  }
});

router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const entries = await Entry.find({ userId }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Error loading entries' });
  }
});

router.patch('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedEntry = await Entry.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );
    if (!updatedEntry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json(updatedEntry);
  } catch (err) {
    res.status(500).json({ error: 'Error updating entries' });
  }
});

router.delete('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const deleted = await Entry.findOneAndDelete({ _id: req.params.id, userId });
    if (!deleted) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error when deleting a entry' });
  }
});

export default router;
