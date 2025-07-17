// MovieList.jsx (or your Home.jsx)
import React, { useState, useContext, useEffect } from 'react'; // Added useEffect
import MovieCard from './MovieCard.jsx';
import { client } from '../api.js'; // Ensure this path is correct
import { MovieContext } from '../contexts/MovieContext.jsx'; // Ensure this path is correct

export default function MovieList() { // Or export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true); // To differentiate initial state from no results after search
  const { movies, setMovies } = useContext(MovieContext);

  // Optional: Fetch some initial movies on component mount
  useEffect(() => {
    const fetchInitialMovies = async () => {
      setLoading(true);
      try {
        // Fetch popular or recent movies, or just a default search
        const res = await client.get('/movies', { params: { search: 'Avengers' } }); // Example initial search
        setMovies(res.data);
      } catch (error) {
        console.error("Error fetching initial movies:", error);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };
    if (initialLoad) { // Only run once on initial mount
      fetchInitialMovies();
    }
  }, []); // Empty dependency array means this runs once on mount

  async function search() {
    if (!query.trim()) {
      setMovies([]); // Clear movies if query is empty
      setInitialLoad(false); // Mark that an action has been taken
      return;
    }

    setLoading(true);
    setInitialLoad(false); // A search has been performed
    try {
      const res = await client.get('/movies', { params: { search: query.trim() } });
      setMovies(res.data);
    } catch (error) {
      console.error("Error during movie search:", error);
      setMovies([]); // Clear movies on error
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-center justify-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search movies by title..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border border-gray-300 p-3 rounded-lg flex-grow max-w-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          disabled={loading}
        />
        <button
          onClick={search}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto"
          disabled={loading || !query.trim()}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {loading && (
        <div className="text-center py-10 text-xl text-gray-700">
          <p>Loading movies...</p>
          {/* A simple spinner for demonstration */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mt-4"></div>
        </div>
      )}

      {!loading && movies.length === 0 && !initialLoad && query.trim() && (
        <div className="text-center py-10 text-gray-500 text-lg">
          <p>No movies found for "{query}". Try a different search term.</p>
        </div>
      )}

      {!loading && movies.length === 0 && initialLoad && (
        <div className="text-center py-10 text-gray-500 text-lg">
          <p>Start by searching for your favorite movies!</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {!loading && movies.map(m => (
          // Ensure movie.imdbID is unique and exists
          m.imdbID ? <MovieCard key={m.imdbID} movie={m} /> : null
        ))}
      </div>
    </div>
  );
}