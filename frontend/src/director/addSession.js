import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddSession() {
  const [session_id, setSessionId] = useState('');
  const [movie_id, setMovieId] = useState('');
  const [theatre_id, setTheatreId] = useState('');
  const [slot, setSlot] = useState('');
  const [date, setDate] = useState('');
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
        session_id,
        movie_id,
        theatre_id,
        slot,
        date
    };

    axios
      .post('http://localhost:3001/api/director/add_session', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Session added successfully!');
        resetForm();
        setErrorMessage(''); // Hata mesajını temizle
      })
      .catch(error => {
        console.error('Error adding session:', error);
        setErrorMessage('Failed to add session.');
        setSuccessMessage(''); // Başarı mesajını temizle
      });
  };

  const resetForm = () => {
    setSessionId('');
    setMovieId('');
    setTheatreId('');
    setSlot('');
    setDate('');
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
        placeholder="Session ID"
        value={session_id}
        onChange={e => setSessionId(e.target.value)}
      />
      <br />
      <br />
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
        placeholder="Theatre ID"
        value={theatre_id}
        onChange={e => setTheatreId(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Slot"
        value={slot}
        onChange={e => setSlot(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
}

export default AddSession;
