
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null); // Yeni hata durumu

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        if (token) {
          const response = await axios.get('http://localhost:3001/api/audience/list_movie', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setMovies(response.data.Movies);
        }
      } catch (error) {
        setError("Failed to list movies: " + error.message); // Hata durumunu ayarla
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Session List</h2>
      {error && <p>{error}</p>} {}
      {movies.map((movie, index) => (
        <div key={index}>
          <h3>Movie {movie.movie_id}</h3>
          <p>Movie ID: {movie.movie_id}</p>
          <p>Name: {movie.movie_name}</p>
          <p>Director Surname: {movie.user_surname}</p>
          <p>Platform ID: {movie.platform_id}</p>
          <p>Theatre ID: {movie.theatre_id}</p>
          <p>Date: {movie.session_date}</p>
          <p>Slot: {movie.slot}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
