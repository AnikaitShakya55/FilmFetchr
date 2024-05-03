import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import AddMovieForm from './components/AddMovieForm';
import Heading from './Layout/Heading';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryingId, setRetryingId] = useState(null);

  useEffect(() => {
    fetchMovieHandler(); // Fetch data when the component mounts
  }, []);

  async function fetchMovieHandler() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://common-realtime-database-link-default-rtdb.europe-west1.firebasedatabase.app/FetchMovie.json');
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      
      const data = await response.json();
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (error) {
      const intervalId = setInterval(fetchMovieHandler, 3000);  
      setRetryingId(intervalId);
    } else {
      clearInterval(retryingId);
    }
      
    return () => clearInterval(retryingId);
  }, [error]);

  const cancelRetryHandler = () => {
    clearInterval(retryingId);
  };

  async function addMovieHandler(movieData) {
    try {
      const response = await fetch('https://common-realtime-database-link-default-rtdb.europe-west1.firebasedatabase.app/FetchMovie.json', {
        method: 'POST',
        body: JSON.stringify(movieData),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Failed to add movie');
      }
      
      // After successfully adding the movie, fetch the updated list of movies
      fetchMovieHandler();

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error adding movie:', error.message);
    }
  }

  let content; 

  if (error) {
    content = (
      <div>
        <p>{error}</p>
        <button onClick={cancelRetryHandler}>Cancel Retry</button>
      </div>
    );
  } else if (loading) {
    content = <p>Loading...</p>;
  } else if (movies.length === 0) {
    content = <p>No movies found</p>;
  } else {
    content = <MoviesList movies={movies} />;
  }
  
  return (
    <React.Fragment>
      <section>
        <Heading/> 
        <AddMovieForm addMovieHandler={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
