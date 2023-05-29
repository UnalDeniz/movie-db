
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get('http://localhost:3001/api/director/list_movie', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setMovies(response.data.Movies);
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
      {error && <p>{error}</p>} 
      {movies.map((movie, index) => (
        <div key={index}>
          <h3>Movie {index + 1}</h3>
          <p>Movie ID: {movie.movie_id}</p>
          <p>Movie Name: {movie.movie_name}</p>
          <p>Theatre ID: {movie.theatre_id}</p>
          <p>Slot: {movie.slot}</p>
          <p>Date: {movie.session_date}</p>
          <p>Predecessors List: {movie.predecessors_list}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
