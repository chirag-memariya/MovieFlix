// MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  // Use a default placeholder image if movie.Poster is "N/A" or falsy
  const imageUrl = movie.Poster && movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://placehold.co/600x400'; // A better placeholder

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="block border border-gray-200 rounded-lg overflow-hidden
                 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out
                 bg-white transform hover:-translate-y-1"
    >
      <div className="w-full h-72 sm:h-64 md:h-72 lg:h-80 overflow-hidden flex items-center justify-center bg-gray-100">
        <img
          src={imageUrl}
          alt={movie.Title || 'Movie Poster'} // Add a fallback for alt text
          className="w-full h-full object-cover" // object-cover ensures it covers the area
          onError={(e) => {
            // Fallback for broken image links after initial check
            e.target.onerror = null; // prevents infinite loop if placeholder also breaks
            e.target.src = 'https://via.placeholder.com/300x450?text=Image+Failed+to+Load';
          }}
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-bold text-xl text-gray-900 truncate mb-1" title={movie.Title}>
          {movie.Title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{movie.Year}</p>
        {movie.imdbRating && movie.imdbRating !== 'N/A' && (
          <p className="text-md text-yellow-600 font-semibold flex items-center justify-center">
            <span className="mr-1">⭐</span> {movie.imdbRating} / 10
          </p>
        )}
      </div>
    </Link>
  );
}