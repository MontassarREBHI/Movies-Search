import { useState } from 'react';
import './App.css';
import MovieCard from './MovieCard.jsx';

function App() {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [movies, setMovies] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 3;

  const searchMovies = async () => {
    setLoading(true);
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&y=${year}&apikey=e644856d`);
    const data = await response.json();
    const moviesWithDetails = await Promise.all(
      (data.Search || []).map(async (movie) => {
        const movieDetailsResponse = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=e644856d`);
        const movieDetails = await movieDetailsResponse.json();
        return { ...movie, imdbRating: movieDetails.imdbRating, Genre: movieDetails.Genre };
      })
    );
    setMovies(moviesWithDetails);
    setLoading(false);
    setCurrentPage(1); // Reset to first page on new search
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

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        <h1>Movie Search App</h1>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for a movie..." 
          onKeyPress={handleKeyPress}
        />
        <input 
          type="text" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          placeholder="Year" 
        />
        <button onClick={searchMovies}>Search</button>
        <button onClick={sortMovies}>Sort by Rating</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="movies">
            {currentMovies.map(movie => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }, (_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default App;