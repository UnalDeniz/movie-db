import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieList() {
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [theatres, setTheatres] = useState([]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    setAccessToken(storedAccessToken);
  }, []);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSlotChange = (event) => {
    setSlot(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get('http://localhost:3001/api/director/list_theatre', {
        params: {
          date: date,
          slot: slot
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        setTheatres(response.data.Theatre);
        setError(null);
      })
      .catch(error => {
        setTheatres([]);
        setError('Failed to fetch theatres.');
        console.error(error);
      });
      console.log(theatres);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="text" value={date} onChange={handleDateChange} />
        </label>
        <label>
          Slot:
          <input type="text" value={slot} onChange={handleSlotChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {error && <div>{error}</div>}

      <h1>Theatre List</h1>
      <ul>
        {theatres.map(theatre => (
          <li key={theatre.theatre_id}>
            <strong>Theatre ID:</strong> {theatre.theatre_id}<br />
            <strong>District:</strong> {theatre.district}<br />
            <strong>Capacity:</strong> {theatre.theatre_capacity}<br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
