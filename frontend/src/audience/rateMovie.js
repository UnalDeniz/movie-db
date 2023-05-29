import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RateMovie() {
  const [movie_id, setMovieId] = useState('');
  const [rating, setRating] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    setAccessToken(storedAccessToken);
  }, []);

  const handleFormSubmit = () => {
    const data = {
      movie_id,
      rating,
    };

    axios.post('http://localhost:3001/api/audience/rate_movie', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => {
        console.log(response.data);
        setSuccessMessage('You rated the movie!');
        resetForm();
        setErrorMessage(''); 
      })
      .catch(error => {
        console.error('Error rating movie:', error);
        setErrorMessage('Failed to rated the movie.');
        setSuccessMessage(''); 
      });
  };

  const resetForm = () => {
    setMovieId('');
    setRating('');
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <input
        type="text"
        placeholder="Movie ID"
        value={movie_id}
        onChange={e => setMovieId(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Rating"
        value={rating}
        onChange={e => setRating(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
}

export default RateMovie;
