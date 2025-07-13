// App.js
import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);

  // Initial Studio Ghibli movie data
  useEffect(() => {
    const ghibliMovies = [
      {
        id: 1,
        title: "Spirited Away",
        description: "A young girl enters a magical world of spirits and must work to free her parents.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        rating: 8.6
      },
      {
        id: 2,
        title: "My Neighbor Totoro",
        description: "Two sisters encounter friendly forest spirits in postwar rural Japan.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BYzJjMTk1NjEtNGU5Mi00ZTYyLWIyYzgtYjVkODI4Yzg5NDM3XkEyXkFqcGdeQXVyMzg2MzE2OTE@._V1_.jpg",
        rating: 8.2
      },
      {
        id: 3,
        title: "Princess Mononoke",
        description: "A warrior prince becomes involved in a struggle between forest gods and humans.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BNTZkYmI0MmEtNGFlZC00OWZjLWFjMmItMjk1OWZkOWJiZGVjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        rating: 8.4
      },
      {
        id: 4,
        title: "Howl's Moving Castle",
        description: "A young woman cursed with an old body seeks help from a wizard in a magical castle.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BNmM4YTFmMmItMGE3Yy00MmRkLTlmZGEtMzZlOTQzYjk3MzA2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        rating: 8.2
      },
      {
        id: 5,
        title: "Kiki's Delivery Service",
        description: "A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BMTc4MTg3NTQzN15BMl5BanBnXkFtZTgwNjM4OTEyMTI@._V1_.jpg",
        rating: 7.8
      },
      {
        id: 6,
        title: "Ponyo",
        description: "A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BOTc3YmM3N2QtODZkMC00ZDE5LThjMTQtYTljN2Y1YTYwYWJkXkEyXkFqcGdeQXVyODEzNjM5OTQ@._V1_.jpg",
        rating: 7.6
      }
    ];
    setMovies(ghibliMovies);
    setFilteredMovies(ghibliMovies);
  }, []);

  // Filter movies based on title and rating
  useEffect(() => {
    const filtered = movies.filter(movie => 
      movie.title.toLowerCase().includes(titleFilter.toLowerCase()) && 
      movie.rating >= ratingFilter
    );
    setFilteredMovies(filtered);
  }, [titleFilter, ratingFilter, movies]);

  const addMovie = (newMovie) => {
    const newId = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
    const movieToAdd = { ...newMovie, id: newId };
    setMovies([...movies, movieToAdd]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Studio Ghibli Library</h1>
        <div className="studio-logo">風の谷</div>
      </header>
      
      <main>
        <Filter 
          titleFilter={titleFilter}
          ratingFilter={ratingFilter}
          setTitleFilter={setTitleFilter}
          setRatingFilter={setRatingFilter}
          onAddMovie={addMovie}
        />
        
        <MovieList movies={filteredMovies} />
      </main>
      
      <footer className="footer">
        <p>Totoro's Movie Sanctuary • となりのトトロ</p>
      </footer>
    </div>
  );
}

export default App;