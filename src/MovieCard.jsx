/* eslint-disable react/prop-types */

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <h2 className="movie-title">{movie.Title}</h2>
      <p className="movie-year">{movie.Year}</p>
      <img src={movie.Poster} alt={`${movie.Title} poster`} className="movie-poster" />
      <p className="movie-genre">Genre: {movie.Genre}</p> {/* Replace Type with Genre */}
      <p className="movie-rating">Rating: {movie.imdbRating}</p> {/* Replace IMDB ID with rating */}
      <p className="movie-plot">Plot: {movie.Plot}</p> {/* Display the plot */}
    </div>
  );
}

export default MovieCard;