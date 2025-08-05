import express from 'express';

import verifyFirebaseToken from '../middleware/verifyFirebaseToken.js';
import Entry from '../models/Entry.js';

const router = express.Router();

router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const newEntry = new Entry({ ...req.body, userId });
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Error creating a new entry', details: err.message });
  }
});

router.get('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const entry = await Entry.findOne({ _id: req.params.id, userId });

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json(entry);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Error fetching entry', details: err.message });
  }
});

router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filters = { userId };

    if (req.query.startDate || req.query.endDate) {
      filters.date = {};
      if (req.query.startDate) {
        filters.date.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        const endDate = new Date(req.query.endDate);
        endDate.setHours(23, 59, 59, 999);
        filters.date.$lte = endDate;
      }
    }

    if (req.query.minGlucose || req.query.maxGlucose) {
      filters.glucose = {};
      if (req.query.minGlucose) {
        filters.glucose.$gte = parseFloat(req.query.minGlucose);
      }
      if (req.query.maxGlucose) {
        filters.glucose.$lte = parseFloat(req.query.maxGlucose);
      }
    }

    if (req.query.minbolusInsulin || req.query.maxbolusInsulin) {
      filters.bolusInsulin = {};
      if (req.query.minbolusInsulin) {
        filters.bolusInsulin.$gte = parseFloat(req.query.minbolusInsulin);
      }
      if (req.query.maxbolusInsulin) {
        filters.bolusInsulin.$lte = parseFloat(req.query.maxbolusInsulin);
      }
    }

    if (req.query.minbasalInsulin || req.query.maxbasalInsulin) {
      filters.basalInsulin = {};
      if (req.query.minbasalInsulin) {
        filters.basalInsulin.$gte = parseFloat(req.query.minbasalInsulin);
      }
      if (req.query.maxbasalInsulin) {
        filters.basalInsulin.$lte = parseFloat(req.query.maxbasalInsulin);
      }
    }

    if (req.query.characterizedBy) {
      filters.characterizedBy = req.query.characterizedBy;
    }

    if (req.query.search) {
      filters.$or = [
        { notes: { $regex: req.query.search, $options: 'i' } },
        { symptoms: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    console.log('Received query parameters:', req.query);
    console.log('Constructed filters object:', filters);

    const total = await Entry.countDocuments(filters);

    const entries = await Entry.find(filters)
      .sort({ date: -1, time: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      entries,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Error loading entries', details: err.message });
  }
});

router.patch('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedEntry = await Entry.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true },
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
    const deleted = await Entry.findOneAndDelete({
      _id: req.params.id,
      userId,
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error when deleting a entry' });
  }
});

export default router;
