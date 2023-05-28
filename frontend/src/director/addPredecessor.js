import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddPredecessor() {
  const [predecessor, setPredecessor] = useState('');
  const [successor, setSuccessor] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    setAccessToken(storedAccessToken);
  }, []);

  const handleFormSubmit = () => {
    const data = {
        predecessor,
        successor,
    };

    axios
      .post('http://localhost:3001/api/director/add_predecessor', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Predecessor added successfully!');
        resetForm();
        setErrorMessage(''); // Hata mesajını temizle
      })
      .catch(error => {
        console.error('Error adding predecessor:', error);
        setErrorMessage('Failed to add predecessor.');
        setSuccessMessage(''); // Başarı mesajını temizle
      });
  };

  const resetForm = () => {
    setPredecessor('');
    setSuccessor('');
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
        placeholder="Predecessor"
        value={predecessor}
        onChange={e => setPredecessor(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Successor"
        value={successor}
        onChange={e => setSuccessor(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
}

export default AddPredecessor;
