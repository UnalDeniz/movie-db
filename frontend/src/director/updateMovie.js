import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateMovieForm() {
  const [id, setMovieId] = useState('');
  const [name, setMovieName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    setAccessToken(storedAccessToken);
  }, []);

  const handleFormSubmit = () => {
    const data = {
        id,
        name
    };

    axios.post('http://localhost:3001/api/director/update_movie', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Movie updated successfully!');
        resetForm();
        setErrorMessage(''); 
      })
      .catch(error => {
        console.error('Error updating movie:', error);
        setErrorMessage('Failed to update movie.');
        setSuccessMessage(''); 
      });
  };

  const resetForm = () => {
    setMovieName('');
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
        placeholder="Movie Name"
        value={name}
        onChange={e => setMovieName(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Movie ID"
        value={id}
        onChange={e => setMovieId(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
}

export default UpdateMovieForm;
