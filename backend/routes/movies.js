import express from 'express';
import { fetchAndCache, getMovieById } from '../utils.js';
const router = express.Router();

// GET /movies?search=title
router.get('/', async (req, res) => {
  const { search } = req.query;
  const movies = await fetchAndCache(search);
  res.json(movies);
});

// GET /movies/:id
router.get('/:id', async (req, res) => {
  const movie = await getMovieById(req.params.id);
  res.json(movie);
});

export default router;