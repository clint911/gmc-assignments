// components/MovieCard.js
import React from 'react';
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="card-header">
        <h2>{movie.title}</h2>
        <div className="rating-badge">⭐ {movie.rating}</div>
      </div>
      
      <div className="poster-container">
        <img 
          src={movie.posterURL} 
          alt={movie.title} 
          className="movie-poster"
        />
      </div>
      
      <div className="card-footer">
        <p>{movie.description}</p>
        <div className="ghibli-stamp">スタジオジブリ</div>
      </div>
    </div>
  );
};

export default MovieCard;