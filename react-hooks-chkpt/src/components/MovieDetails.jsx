// components/MovieDetails.js
import React from 'react';
import { useParams, Link } from 'react-router';
import '../styles/MovieDetails.css';

const MovieDetails = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find(movie => movie.id === parseInt(id));

  if (!movie) {
    return (
      <div className="movie-details">
        <div className="error-state">
          <div className="soot-sprite" />
          <h2>Movie Not Found</h2>
          <Link to="/" className="back-button">
            ← Back to Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-details">
      <div className="detail-container">
        <div className="detail-poster">
          <img src={movie.posterURL} alt={movie.title} />
        </div>
        
        <div className="detail-content">
          <div className="detail-header">
            <h2>{movie.title}</h2>
            <div className="detail-rating">⭐ {movie.rating}</div>
          </div>
          
          <p className="detail-description">{movie.description}</p>
          
          <div className="trailer-container">
            <h3>Official Trailer</h3>
            <div className="video-wrapper">
              <iframe 
                src={movie.trailerURL}
                title={`${movie.title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          
          <Link to="/" className="back-button">
            ← Back to Library
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;