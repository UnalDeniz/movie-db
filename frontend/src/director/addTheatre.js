import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddTheatre() {
  const [id, setId] = useState('');
  const [capacity, setCapacity] = useState('');
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    setAccessToken(storedAccessToken);
  }, []);

  const handleFormSubmit = () => {
    const data = {
      id,
      name,
      capacity,
      district,
    };

    axios
      .post('http://localhost:3001/api/director/add_theatre', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Theatre added successfully!');
        resetForm();
        setErrorMessage(''); 
      })
      .catch(error => {
        console.error('Error adding theatre:', error);
        setErrorMessage('Failed to add theatre.');
        setSuccessMessage(''); 
      });
  };

  const resetForm = () => {
    setId('');
    setName('');
    setDistrict('');
    setCapacity('');
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
        placeholder="Id"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Capacity"
        value={capacity}
        onChange={e => setCapacity(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="District"
        value={district}
        onChange={e => setDistrict(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
}

export default AddTheatre;
