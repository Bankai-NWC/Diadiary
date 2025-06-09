import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import entryRoutes from './routes/entry.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173', // URL фронтенда
    credentials: true,
  }),
);

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/entries', entryRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
