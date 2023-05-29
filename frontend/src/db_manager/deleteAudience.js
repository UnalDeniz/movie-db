import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteAudienceForm() {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    setAccessToken(storedAccessToken);
  }, []);

  const handleFormSubmit = () => {
    const data = {
      username
    };

    axios
      .post('http://localhost:3001/api/manager/delete_audience', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Audience deleted successfully!');
        resetForm();
        setErrorMessage(''); 
      })
      .catch(error => {
        console.error('Error deleting audience:', error);
        setErrorMessage('Failed to delete audience.');
        setSuccessMessage(''); 
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
