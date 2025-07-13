// App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import MovieDetails from './components/MovieDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);

  // Full list of 12 Studio Ghibli movies
  useEffect(() => {
    const ghibliMovies = [
      {
        id: 1,
        title: "Spirited Away",
        description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        rating: 8.6,
        trailerURL: "https://www.youtube.com/embed/ByXuk9QqQkk"
      },
      {
        id: 2,
        title: "My Neighbor Totoro",
        description: "When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BYzJjMTk1NjEtNGU5Mi00ZTYyLWIyYzgtYjVkODI4Yzg5NDM3XkEyXkFqcGdeQXVyMzg2MzE2OTE@._V1_.jpg",
        rating: 8.2,
        trailerURL: "https://www.youtube.com/embed/TUc70c8xL2M"
      },
      {
        id: 3,
        title: "Princess Mononoke",
        description: "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BNTZkYmI0MmEtNGFlZC00OWZjLWFjMmItMjk1OWZkOWJiZGVjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        rating: 8.4,
        trailerURL: "https://www.youtube.com/embed/4OiMOHRDs14"
      },
      {
        id: 4,
        title: "Howl's Moving Castle",
        description: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BNmM4YTFmMmItMGE3Yy00MmRkLTlmZGEtMzZlOTQzYjk3MzA2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        rating: 8.2,
        trailerURL: "https://www.youtube.com/embed/iwROgK94zcM"
      },
      {
        id: 5,
        title: "Kiki's Delivery Service",
        description: "A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BOTc0ODM1Njk1NF5BMl5BanBnXkFtZTcwMDI5OTEyNw@@._V1_.jpg",
        rating: 7.9,
        trailerURL: "https://www.youtube.com/embed/4bG17OYs-GA"
      },
      {
        id: 6,
        title: "Ponyo",
        description: "A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BOTc3YmM3N2QtODZkMC00ZDE5LThjMTQtYTljN2Y1YTYwYWJkXkEyXkFqcGdeQXVyODEzNjM5OTQ@._V1_.jpg",
        rating: 7.7,
        trailerURL: "https://www.youtube.com/embed/CsR3KVgBzSM"
      },
      {
        id: 7,
        title: "The Tale of Princess Kaguya",
        description: "Found inside a shining stalk of bamboo by an old bamboo cutter and his wife, a tiny girl grows rapidly into an exquisite young lady. The mysterious young princess enthralls all who encounter her, but ultimately she must confront her fate.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BNThmMWMyMWMtOWRiNy00MGY0LTg1OTUtNjYzODg2MjdlZGU5XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        rating: 8.0,
        trailerURL: "https://www.youtube.com/embed/W71mtorCZDw"
      },
      {
        id: 8,
        title: "When Marnie Was There",
        description: "A young girl is sent to the country for health reasons, where she meets a mysterious young woman.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BNDVkYjA0M2YtYzAwZi00ODk1LTg1OTMtMjA3N2IzOTI1ZTY3XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        rating: 7.7,
        trailerURL: "https://www.youtube.com/embed/jjmrxqcQdYg"
      },
      {
        id: 9,
        title: "The Wind Rises",
        description: "A look at the life of Jiro Horikoshi, the man who designed Japanese fighter planes during World War II.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BMTU4NDg0MzkzNV5BMl5BanBnXkFtZTgwODA3Mzc1MDE@._V1_.jpg",
        rating: 7.8,
        trailerURL: "https://www.youtube.com/embed/YrueAaw0RYg"
      },
      {
        id: 10,
        title: "Grave of the Fireflies",
        description: "A young boy and his little sister struggle to survive in Japan during World War II.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BZmY2NjUzNDQtNTgxNC00M2Q4LTljOWQtMjNjNDBjNWUxNmJlXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        rating: 8.5,
        trailerURL: "https://www.youtube.com/embed/4vPeTSRd580"
      },
      {
        id: 11,
        title: "Porco Rosso",
        description: "In 1930s Italy, a veteran World War I pilot is cursed to look like an anthropomorphic pig.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BZDE1ZTY5YzktM2Y1YS00OWYzLTg4NDQtODBiNWRkMjA4YzQ0XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg",
        rating: 7.8,
        trailerURL: "https://www.youtube.com/embed/awEC-aLDzjs"
      },
      {
        id: 12,
        title: "Whisper of the Heart",
        description: "A love story between a girl who loves reading books, and a boy who has previously checked out all of the library books she chooses.",
        posterURL: "https://m.media-amazon.com/images/M/MV5BZDQyOTQzZDgtZGYzOS00M2YyLWI0YjQtNTU0MWFlYzYxN2FkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        rating: 7.9,
        trailerURL: "https://www.youtube.com/embed/0pVkiod6V0U"
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
        <Header />
        
        <Routes>
          <Route path="/" element={
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
          } />
          <Route path="/movie/:id" element={<MovieDetails movies={movies} />} />
        </Routes>
        
        <Footer />
      </div>
  );
}

export default App;