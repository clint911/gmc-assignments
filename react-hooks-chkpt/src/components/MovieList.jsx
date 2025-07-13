import React from 'react';
import MovieCard from './MovieCard';
import '../styles/MovieList.css';

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.length === 0 ? (
        <div className="no-results">
          <div className="totoro-placeholder" />
          <p>No movies found! Try different filters</p>
        </div>
      ) : (
        movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      )}
    </div>
  );
};

export default MovieList;