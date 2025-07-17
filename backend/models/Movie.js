import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  imdbID: String,
  Title: String,
  Year: Number,
  Genre: [String],
  Director: String,
  Actors: [String],
  Runtime_minutes: Number,
  imdbRating: Number,
  cachedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Movie', movieSchema);