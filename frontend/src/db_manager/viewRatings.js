import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RatingList() {
  const [audience, setAudience] = useState('');
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    setAccessToken(storedAccessToken);
  }, []);

  const handleInputChange = (event) => {
    setAudience(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get('http://localhost:3001/api/manager//list_ratings', {
        params: {
          username: audience
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        setRatings(response.data.Ratings);
        setError(null);
      })
      .catch(error => {
        setRatings([]);
        setError('Failed to fetch ratings.');
        console.error(error);
      });
      console.log(ratings);
  };

  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Audience:
          <input type="text" value={audience} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {error && <div>{error}</div>}

      <h1>Movie List</h1>
      <ul>
        {ratings.map(rating => (
          <li key={rating.movie_id}>
            <strong>Movie ID:</strong> {rating.movie_id}<br />
            <strong>Movie Name:</strong> {rating.movie_name}<br />
            <strong>Rating:</strong> {rating.rating}<br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RatingList;
