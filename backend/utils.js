import axios from 'axios';
import Movie from './models/Movie.js';
import { config } from './config.js';

export async function fetchAndCache(title) {
  const existing = await Movie.findOne({ Title: title });
  if (existing && ((Date.now() - existing.cachedAt.getTime())/1000) < config.CACHE_TTL) {
    return [existing];
  }
  const { data } = await axios.get(`http://www.omdbapi.com/?apikey=${config.OMDB_API_KEY}&s=${title}`);
  if (!data.Search) return [];
  const movies = await Promise.all(data.Search.map(async m => {
    const full = await axios.get(`http://www.omdbapi.com/?apikey=${config.OMDB_API_KEY}&i=${m.imdbID}`);
    const d = full.data;
    const doc = new Movie({
      imdbID: d.imdbID,
      Title: d.Title,
      Year: parseInt(d.Year),
      Genre: d.Genre.split(',').map(g=>g.trim()),
      Director: d.Director,
      Actors: d.Actors.split(',').map(a=>a.trim()),
      Runtime_minutes: parseInt(d.Runtime)||0,
      imdbRating: parseFloat(d.imdbRating)||0
    });
    await doc.save();
    return doc;
  }));
  return movies;
}

export async function getMovieById(imdbID) {
  let movie = await Movie.findOne({ imdbID });
  if (movie && ((Date.now() - movie.cachedAt.getTime())/1000) < config.CACHE_TTL) {
    return movie;
  }
  const { data } = await axios.get(`http://www.omdbapi.com/?apikey=${config.OMDB_API_KEY}&i=${imdbID}`);
  const updated = new Movie({
    imdbID: data.imdbID,
    Title: data.Title,
    Year: parseInt(data.Year),
    Genre: data.Genre.split(',').map(g=>g.trim()),
    Director: data.Director,
    Actors: data.Actors.split(',').map(a=>a.trim()),
    Runtime_minutes: parseInt(data.Runtime)||0,
    imdbRating: parseFloat(data.imdbRating)||0
  });
  await updated.save();
  return updated;
}