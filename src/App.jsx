import { useState } from 'react';
import './App.css';
import MovieCard from './MovieCard.jsx';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  const searchMovies = async () => {
    const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=e644856d`);
    const data = await response.json();
    const moviesWithDetails = await Promise.all(
      (data.Search || []).map(async (movie) => {
        const movieDetailsResponse = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=e644856d`);
        const movieDetails = await movieDetailsResponse.json();
        return { ...movie, imdbRating: movieDetails.imdbRating, Genre: movieDetails.Genre };
      })
    );
    setMovies(moviesWithDetails);
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
        <h1 style={{ fontSize: '36px', color: '#4CAF50', textShadow: '2px 2px #000' }}>Movie Search App</h1> {/* Enhanced title style */}
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          onKeyPress={handleKeyPress} // Handle Enter key press
          placeholder="Search for a movie..." 
          style={{ fontSize: '20px', padding: '10px', marginRight: '10px' }} // Enhanced style
        />
        <button onClick={searchMovies} style={{ marginRight: '10px' }}>Search</button>
        <button onClick={sortMovies} style={{ marginRight: '10px' }}>Sort by Rating</button>
        <button onClick={clearResults}>Clear</button>
      </div>
      <div className="movies">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          <p>Find some cool movies ... </p>
        )}
      </div>
      <footer style={{ marginTop: '20px', fontSize: '14px', color: '#888' }}>
        <p>Powered by OMDb API</p>
      </footer>
    </>
  );
}

export default App;