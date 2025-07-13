import React from 'react';
import { Link } from 'react-router';
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="card-header">
        <Link to={`/movie/${movie.id}`} className="movie-link">
          <h2>{movie.title}</h2>
        </Link>
        <div className="rating-badge">⭐ {movie.rating}</div>
      </div>
      
      <Link to={`/movie/${movie.id}`} className="poster-container">
        <img 
          src={movie.posterURL} 
          alt={movie.title} 
          className="movie-poster"
        />
      </Link>
      
      <div className="card-footer">
        <p>{movie.description.substring(0, 100)}...</p>
        <div className="ghibli-stamp">スタジオジブリ</div>
        <Link to={`/movie/${movie.id}`} className="details-link">
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;