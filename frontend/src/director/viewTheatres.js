
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [theatres, setTheatres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await axios.get('http://localhost:3001/api/director/list_theatre', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTheatres(response.data.Theatre);
        }
      } catch (error) {
        setError("Failed to list directors: " + error.message); 
        
      }
    };

    fetchData();
  }, []);
  

  return (
    <div>
      <h2>Theatre List</h2>
      {error && <p>{error}</p>} {/* Hata durumunu yazdır */}
      {theatres.map((theatre, index) => (
        <div key={index}>
          <h3>Theatre {index + 1}</h3>
          <p>Username: {theatre.theatre_id}</p>
          <p>Name: {theatre.district}</p>
          <p>Surname: {theatre.theatre_capacity}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
