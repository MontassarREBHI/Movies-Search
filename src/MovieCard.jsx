/* eslint-disable react/prop-types */

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <h2>{movie.Title}</h2>
      <p>{movie.Year}</p>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <p>Genre: {movie.Genre}</p> {/* Replace Type with Genre */}
      <p>Rating: {movie.imdbRating}</p> {/* Replace IMDB ID with rating */}
    </div>
  );
}

export default MovieCard;