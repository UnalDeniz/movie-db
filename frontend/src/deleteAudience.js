import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteAudienceForm() {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // localStorage'dan accessToken'ı alma
    const storedAccessToken = localStorage.getItem('accessToken');
    setAccessToken(storedAccessToken);
  }, []);

  const handleFormSubmit = () => {
    const data = {
      username
    };

    axios.delete('http://localhost:3001/api/manager/delete_audience', {
        headers: {
            'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
        },
        data: {
            username
        }
  })
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Audience deleted successfully!');
        resetForm();
        setErrorMessage(''); // Hata mesajını temizle
      })
      .catch(error => {
        console.error('Error deleting audience:', error);
        setErrorMessage('Failed to delete audience.');
        setSuccessMessage(''); // Başarı mesajını temizle
      });
  };

  const resetForm = () => {
    setUsername('');
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
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
}

export default DeleteAudienceForm;
