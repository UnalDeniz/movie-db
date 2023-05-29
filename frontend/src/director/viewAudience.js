import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AudienceList() {
  const [movie, setMovie] = useState('');
  const [audiences, setAudiences] = useState([]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    setAccessToken(storedAccessToken);
  }, []);

  const handleInputChange = (event) => {
    setMovie(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get('http://localhost:3001/api/director/list_audience', {
        params: {
          id: movie
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        setAudiences(response.data.Audience);
        setError(null);
      })
      .catch(error => {
        setAudiences([]);
        setError('Failed to fetch movies.');
        console.error(error);
      });
  };

  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Movie ID:
          <input type="text" value={movie} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {error && <div>{error}</div>}

      <h1>Audience List</h1>
      <ul>
        {audiences.map(audience => (
          <li key={0}>
            <strong>Username:</strong> {audience.username}<br />
            <strong>User Name:</strong> {audience.name}<br />
            <strong>User Surname:</strong> {audience.surname}<br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AudienceList;
