import { useState } from 'react';
import './App.css';
import MovieCard from './MovieCard.jsx';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    setLoading(true);
    const trimmedQuery = query.trim();
    const response = await fetch(`https://www.omdbapi.com/?s=${trimmedQuery}&apikey=e644856d`);
    const data = await response.json();
    const moviesWithDetails = await Promise.all(
      (data.Search || []).map(async (movie) => {
        const movieDetailsResponse = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=e644856d`);
        const movieDetails = await movieDetailsResponse.json();
        return { 
          ...movie, 
          imdbRating: movieDetails.imdbRating, 
          Genre: movieDetails.Genre,
          Plot: movieDetails.Plot
        };
      })
    );
    const filteredMovies = moviesWithDetails.filter(movie =>
      movie.Title.toLowerCase().includes(trimmedQuery.toLowerCase())
    );
    setMovies(filteredMovies);
    setLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchMovies();
    }
  };

  const sortMovies = () => {
    const sortedMovies = [...movies].sort((a, b) => b.imdbRating - a.imdbRating);
    setMovies(sortedMovies);
  };

  const clearResults = () => {
    setMovies([]);
    setQuery('');
  };

  return (
    <>
      <div>
        <h1 className="title">Movie Search App</h1>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search by title..." 
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button onClick={searchMovies} className="search-button">Search</button>
        <button onClick={sortMovies} className="sort-button">Sort by Rating</button>
        <button onClick={clearResults} className="clear-button">Clear</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="movies">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
      <footer className="footer">
        <p>Powered by OMDb API</p>
      </footer>
    </>
  );
}

export default App;