import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddDirectorForm({ onDirectorFormSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [nation, setNation] = useState('');
  const [platformId, setPlatformId] = useState('');
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
      username,
      password,
      name,
      surname,
      nation,
      platformId
    };

    axios
      .post('http://localhost:3001/api/manager/add_director', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Director added successfully!');
        onDirectorFormSubmit(response.data);
        resetForm();
        setErrorMessage(''); // Hata mesajını temizle
      })
      .catch(error => {
        console.error('Error adding director:', error);
        setErrorMessage('Failed to add director.');
        setSuccessMessage(''); // Başarı mesajını temizle
      });
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setName('');
    setSurname('');
    setNation('');
    setPlatformId('');
  };

  return (
    <div>
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
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
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
        placeholder="Surname"
        value={surname}
        onChange={e => setSurname(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Nation"
        value={nation}
        onChange={e => setNation(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Platform ID"
        value={platformId}
        onChange={e => setPlatformId(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
}

export default AddDirectorForm;
