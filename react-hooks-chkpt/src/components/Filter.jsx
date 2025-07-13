// components/Filter.js
import React, { useState } from 'react';
import '../styles/Filter.css';

const Filter = ({ 
  titleFilter, 
  ratingFilter, 
  setTitleFilter, 
  setRatingFilter,
  onAddMovie 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMovie({
      ...newMovie,
      rating: parseFloat(newMovie.rating)
    });
    setNewMovie({
      title: '',
      description: '',
      posterURL: '',
      rating: ''
    });
    setIsAdding(false);
  };

  return (
    <div className="filter-section">
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="titleFilter">Search Films:</label>
          <input
            type="text"
            id="titleFilter"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            placeholder="Find a Ghibli movie..."
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="ratingFilter">Min Rating:</label>
          <input
            type="range"
            id="ratingFilter"
            min="0"
            max="10"
            step="0.5"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
          />
          <span className="rating-value">{ratingFilter}</span>
        </div>
        
        <button 
          className="add-button"
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? 'Cancel' : '+ Add Film'}
        </button>
      </div>
      
      {isAdding && (
        <form className="add-movie-form" onSubmit={handleSubmit}>
          <h3>Add New Ghibli Film</h3>
          <input
            type="text"
            name="title"
            value={newMovie.title}
            onChange={handleInputChange}
            placeholder="Film Title"
            required
          />
          <textarea
            name="description"
            value={newMovie.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          <input
            type="url"
            name="posterURL"
            value={newMovie.posterURL}
            onChange={handleInputChange}
            placeholder="Poster URL"
            required
          />
          <input
            type="number"
            name="rating"
            value={newMovie.rating}
            onChange={handleInputChange}
            min="0"
            max="10"
            step="0.1"
            placeholder="Rating (0-10)"
            required
          />
          <button type="submit">Add to Library</button>
        </form>
      )}
    </div>
  );
};

export default Filter;