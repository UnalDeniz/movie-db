import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddAudienceForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [subbed_platforms, setPlatforms] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    setAccessToken(storedAccessToken);
  }, []);

  const handleFormSubmit = () => {
    const data = {
      username,
      password,
      name,
      surname,
      subbed_platforms,
    };

    axios
      .post('http://localhost:3001/api/manager/add_audience', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Audience added successfully!');
        resetForm();
        setErrorMessage(''); 
      })
      .catch(error => {
        console.error('Error adding audience:', error);
        setErrorMessage('Failed to add audience.');
        setSuccessMessage(''); 
      });
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setName('');
    setSurname('');
    setPlatforms([]);
  };
  const handlePlatformsChange = (e) => {
    const selectedPlatforms = e.target.value.split(',').map((platform) => platform.trim());
    setPlatforms(selectedPlatforms);
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
      <label>
        Platforms:
        <input
          type="text"
          value={subbed_platforms.join(',')}
          onChange={handlePlatformsChange}
          placeholder="Enter platforms separated by comma"
        />
      </label>
      <br />
      <br />
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
}

export default AddAudienceForm;
