
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DirectorList = () => {
  const [directors, setDirectors] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        if (token) {
          const response = await axios.get('http://localhost:3001/api/manager/list_director', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setDirectors(response.data.Directors);
          setError(null);
        }
      } catch (error) {
        setError("Failed to list directors: " + error.message); 
        setDirectors([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Director List</h2>
      {error && <p>{error}</p>} 
      {directors.map((director, index) => (
        <div key={index}>
          <h3>Director {index + 1}</h3>
          <p>Username: {director.username}</p>
          <p>Name: {director.name}</p>
          <p>Surname: {director.surname}</p>
          <p>Nation: {director.nation}</p>
          <p>Platform ID: {director.platform_id}</p>
        </div>
      ))}
    </div>
  );
};

export default DirectorList;
