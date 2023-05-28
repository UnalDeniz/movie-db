import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddTheatre() {
  const [movie_id, setMovieId] = useState('');
  const [genres, setGenres] = useState([]);
  const [movie_name, setMovieName] = useState('');
  const [duration, setDuration] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // localStorage'dan accessToken'ı alma
    const storedAccessToken = localStorage.getItem('accessToken');
    setAccessToken(storedAccessToken);
  }, []);

  const handleFormSubmit = () => {
    const data = {
      movie_id,
      movie_name,
      duration,
      genres,
    };

    axios
      .post('http://localhost:3001/api/director/add_movie', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSuccessMessage('Movie added successfully!');
        resetForm();
        setErrorMessage(''); // Hata mesajını temizle
      })
      .catch((error) => {
        console.error('Error adding movie:', error);
        setErrorMessage('Failed to add movie.');
        setSuccessMessage(''); // Başarı mesajını temizle
      });
  };

  const resetForm = () => {
    setMovieId('');
    setGenres([]);
    setMovieName('');
    setDuration('');
  };

  const handleGenresChange = (e) => {
    const selectedGenres = e.target.value.split(',').map((genre) => genre.trim());
    setGenres(selectedGenres);
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
        placeholder="Movie Id"
        value={movie_id}
        onChange={e => setMovieId(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Movie Name"
        value={movie_name}
        onChange={e => setMovieName(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Duration"
        value={duration}
        onChange={e => setDuration(e.target.value)}
      />
      <br />
      <br />
      <label>
        Genres:
        <input
          type="text"
          value={genres.join(',')}
          onChange={handleGenresChange}
          placeholder="Enter genres separated by comma"
        />
      </label>
      <br />
      <br />
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
}

export default AddTheatre;


  