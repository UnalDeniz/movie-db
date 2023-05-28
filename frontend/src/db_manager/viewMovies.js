import React, { useState } from 'react';
import axios from 'axios';

const ViewMovies = () => {
  const [username, setUsername] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      const queryResponse = await axios.get('http://localhost:3001/api/manager/list_movies', {
        params: { username },
        headers: { Authorization: localStorage.getItem('accessToken') }
      });
      console.log(queryResponse);
      setResponse(queryResponse.data.movies);
      setError(null); // Başarılı olduğunda hata durumunu sıfırla
    } catch (error) {
      console.error(error);
      setError('Failed to fetch data'); // Hata durumunu ayarla
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={handleClick}>Send Request</button>
      {error && <p>{error}</p>} {/* Hata durumu varsa hata mesajını görüntüle */}
      {response && (
        <ul>
          {response.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewMovies;
