import express from 'express';
import Movie from '../models/Movie.js';
const router = express.Router();

// GET /stats/genres
router.get('/genres', async (_, res) => {
  const data = await Movie.aggregate([
    { $unwind: '$Genre' },
    { $group: { _id: '$Genre', count: { $sum: 1 } } }
  ]);
  res.json(data);
});

// GET /stats/ratings
router.get('/ratings', async (_, res) => {
  const data = await Movie.aggregate([
    { $unwind: '$Genre' },
    { $group: { _id: '$Genre', avgRating: { $avg: '$imdbRating' } } }
  ]);
  res.json(data);
});

// GET /stats/runtime
router.get('/runtime', async (_, res) => {
  const data = await Movie.aggregate([
    { $group: { _id: '$Year', avgRuntime: { $avg: '$Runtime_minutes' } } },
    { $sort: { _id: 1 } }
  ]);
  res.json(data);
});

export default router;