import React, { useState } from 'react';
import axios from 'axios';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const queryResponse = await axios.get('http://localhost:3001/api/manager/list_movies', {
        params: { searchTerm },
        headers: { Authorization: localStorage.getItem('accessToken') }
      });
      console.log(queryResponse.data);
      setResponse(queryResponse.data.Movies);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch data');
    }
  };

  return (
    <div>
      <h2>Movie Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Enter a movie name"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}
      {response.length > 0 ? (
  response.map((movie, index) => (
    <div key={index}>
      <h3>Movie {index + 1}</h3>
      <p>Movie ID: {movie.movie_id}</p>
      <p>Name: {movie.movie_name}</p>
      <p>Theatre ID: {movie.theatre_id}</p>
      <p>Slot: {movie.slot}</p>
      <p>Predecessors List: {movie.predecessors_list}</p>
    </div>
  ))
) : (
  <p>No movies found.</p>
)}

    </div>
  );
};

export default MovieSearch;
