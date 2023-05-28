
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [theatres, setTheatres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get('http://localhost:3001/api/director/list_theatre', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setMovies(response.data.Theatres);
        }
      } catch (error) {
        setError("Failed to list directors: " + error.message); 
        
      }
    };

    fetchData();
  }, []);
  

  return (
    <div>
      <h2>Movie List</h2>
      {error && <p>{error}</p>} {/* Hata durumunu yazdır */}
      {movies.map((movie, index) => (
        <div key={index}>
          <h3>Movie {index + 1}</h3>
          <p>Username: {movie.movie_id}</p>
          <p>Name: {movie.movie_name}</p>
          <p>Surname: {movie.theatre_id}</p>
          <p>Nation: {movie.slot}</p>
          <p>Platform ID: {movie.predecessors_list}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
