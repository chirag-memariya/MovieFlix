import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../api.js';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await client.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetail();
  }, [id]);

  // --- Start of Defensive Rendering ---

  // 1. Show loading state first
  if (loading) {
    return (
      <div className="p-6 text-center text-xl text-gray-700">
        <p>Loading movie details...</p>
        {/* Optional: Add a spinner here */}
      </div>
    );
  }

  // 2. Show error state if fetching failed
  if (error) {
    return (
      <div className="p-6 text-center text-red-600 text-xl">
        <p>{error}</p>
      </div>
    );
  }

  // 3. If not loading and no error, but 'movie' is still null (e.g., ID not found in API)
  if (!movie) {
    return (
      <div className="p-6 text-center text-gray-700 text-xl">
        <p>Movie not found.</p>
        <p>The ID "{id}" did not return any movie data.</p>
      </div>
    );
  }

  // --- End of Defensive Rendering ---

  // Now, 'movie' is guaranteed to be a non-null object if we reach this point.
  // We can safely access its properties like movie.Poster.

  const imageUrl = movie.Poster && movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://placehold.co/600x400'; // Or your preferred placeholder

  const safeJoin = (arr) => Array.isArray(arr) ? arr.join(', ') : arr || 'N/A';

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-xl mt-8">
      <div className="md:flex md:space-x-8">
        {/* Movie Poster */}
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <img
            src={imageUrl}
            alt={movie.Title || 'Movie Poster'}
            className="w-full h-96 object-cover rounded-lg shadow-md md:w-64 lg:w-80 mx-auto"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/600x400';
            }}
          />
        </div>

        {/* Movie Details */}
        <div className="flex-grow">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {movie.Title} <span className="text-gray-500 text-2xl">({movie.Year})</span>
          </h1>

          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-gray-700">
            {movie.Genre && movie.Genre.length > 0 && (
              <p><strong>Genre:</strong> {safeJoin(movie.Genre)}</p>
            )}
            {movie.Director && movie.Director !== 'N/A' && (
              <p><strong>Director:</strong> {safeJoin(movie.Director)}</p>
            )}
            {movie.Actors && movie.Actors.length > 0 && (
              <p><strong>Actors:</strong> {safeJoin(movie.Actors)}</p>
            )}
            {movie.Runtime_minutes && movie.Runtime_minutes !== 'N/A' && (
              <p><strong>Runtime:</strong> {movie.Runtime_minutes} min</p>
            )}
            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <p className="flex items-center">
                <strong>IMDb Rating:</strong> <span className="ml-2 text-yellow-600 font-semibold flex items-center">
                  <span className="mr-1">⭐</span> {movie.imdbRating} / 10
                </span>
              </p>
            )}
            {movie.Rated && movie.Rated !== 'N/A' && (
              <p><strong>Rated:</strong> <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">{movie.Rated}</span></p>
            )}
            {movie.Released && movie.Released !== 'N/A' && (
              <p><strong>Released:</strong> {movie.Released}</p>
            )}
            {movie.Country && movie.Country !== 'N/A' && (
              <p><strong>Country:</strong> {safeJoin(movie.Country)}</p>
            )}
            {movie.Language && movie.Language !== 'N/A' && (
              <p><strong>Language:</strong> {safeJoin(movie.Language)}</p>
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Plot</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {movie.Plot && movie.Plot !== 'N/A' ? movie.Plot : 'Plot information not available.'}
          </p>

          {movie.Awards && movie.Awards !== 'N/A' && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Awards</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{movie.Awards}</p>
            </>
          )}

          {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Box Office</h2>
              <p className="text-gray-700 leading-relaxed">{movie.BoxOffice}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}