import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdatePlatformIdForm() {
  const [platform_id, setPlatformId] = useState('');
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
      username,
      platform_id
    };

    axios.post('http://localhost:3001/api/manager/update_director', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Platform updated successfully!');
        resetForm();
        setErrorMessage(''); // Hata mesajını temizle
      })
      .catch(error => {
        console.error('Error updating platform:', error);
        setErrorMessage('Failed to update platform.');
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
      <br />
      <br />
      <input
        type="text"
        placeholder="Platform ID"
        value={platform_id}
        onChange={e => setPlatformId(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
}

export default UpdatePlatformIdForm;
