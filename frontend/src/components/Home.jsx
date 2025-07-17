import React, { useState, useContext } from 'react';
import MovieCard from './MovieCard.jsx';
import { client } from '../api.js';
import { MovieContext } from '../contexts/MovieContext.jsx';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const { movies, setMovies } = useContext(MovieContext);

  async function search() {
    if (!query.trim()) return; // Prevent search on empty or just whitespace query

    setLoading(true); // Set loading to true when the request starts
    try {
      const res = await client.get('/movies', { params: { search: query } });
      setMovies(res.data);
    } catch (error) {
      console.error("Error during movie search:", error);
      // Optionally, you could set an error state here to display a message to the user
    } finally {
      setLoading(false); // Set loading to false when the request completes (success or error)
    }
  }

  // Function to handle "Enter" key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <div className="p-6">
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          onChange={e => setQuery(e.target.value)}
          onKeyPress={handleKeyPress} // Add onKeyPress event listener
          className="border p-2 flex-grow rounded"
          disabled={loading} // Disable input when loading
          value={query} // Control the input value
        />
        <button
          onClick={search}
          className="ml-2 bg-green-500 text-white p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !query.trim()} // Disable button when loading or query is empty
        >
          {loading ? 'Searching...' : 'Search'} {/* Change button text based on loading state */}
        </button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <p>Loading movies...</p>
          {/* You can add a spinner here for a better visual loader */}
          {/* For example, if you have an SVG spinner: */}
          {/* <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg> */}
        </div>
      )}

      {!loading && movies.length === 0 && query.trim() && (
        <div className="text-center py-4 text-gray-500">
          <p>No movies found for "{query}". Try a different search term.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Only render MovieCards if not loading AND there are movies */}
        {!loading && movies.map(m => <MovieCard key={m.imdbID} movie={m} />)}
      </div>
    </div>
  );
}