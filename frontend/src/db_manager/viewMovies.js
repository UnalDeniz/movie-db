import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieList() {
  const [director, setDirector] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    setAccessToken(storedAccessToken);
  }, []);

  const handleInputChange = (event) => {
    setDirector(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted'); // Formun submit edildiğinde konsola mesaj yazdırılıyor
    axios.get('http://localhost:3001/api/manager/list_movies', {
        params: {
          username: director
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        setMovies(response.data.Movies);
        setError(null);
      })
      .catch(error => {
        setMovies([]);
        setError('Failed to fetch movies.');
        console.error(error);
      });
      console.log(movies);
  };

  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Director:
          <input type="text" value={director} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {error && <div>{error}</div>}

      <h1>Movie List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.movie_id}>
            <strong>Movie ID:</strong> {movie.movie_id}<br />
            <strong>Movie Name:</strong> {movie.movie_name}<br />
            <strong>Theatre ID:</strong> {movie.theatre_id}<br />
            <strong>District:</strong> {movie.district}<br />
            <strong>Slot:</strong> {movie.slot}<br />
            <strong>Date:</strong> {movie.date}<br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
