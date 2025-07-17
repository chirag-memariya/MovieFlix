import express from 'express';
import cors from 'cors';
import moviesRouter from './routes/movies.js';
import statsRouter from './routes/stats.js';
import { createToken } from './auth.js';
import { config } from './config.js';
import { DBConnection } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Global error logging
process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);

// Start DB
DBConnection()
  .then(() => console.log('✅ DB Connection established!'))
  .catch(err => console.error('❌ DB Connection error:', err));

// Health check
app.get('/', (req, res) => {
  res.send('MovieFlix backend is running ✅');
});

// Auth endpoint
app.post('/auth/token', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    return res.json({ access_token: createToken({ sub: 'admin' }), token_type: 'bearer' });
  }
  res.status(401).send('Invalid credentials');
});

// API routes
app.use('/movies', moviesRouter);
app.use('/stats', statsRouter);

// Start server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});