import React, { useState } from 'react';
import axios from 'axios';

const ViewAverage = () => {
  const [movieId, setMovieId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rating, setRating] = useState(null);

  const handleButtonClick = () => {
    // Axios isteğini burada gerçekleştir
    axios.get(`http://localhost:3001/api/manager/show_avg?id=${movieId}`, {
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    })
    .then(response => {
        console.log(response.data); // İsteğe bağlı olarak yanıtı işleyebilirsiniz
        if (response.data.Ratings && response.data.Ratings.length > 0) {
          setRating(response.data.Ratings[0].overall_rating);
        } else {
          setErrorMessage('No rating available for the movie.');
        }
      })
      .catch(error => {
        console.error(error);
        setErrorMessage('An error occurred. There was a problem processing your request.');
      });
    };
  
    const handleInputChange = event => {
      setMovieId(event.target.value);
    };
  
    return (
      <div>
        <br />
        <br />
        <br />
        <input type="text" value={movieId} onChange={handleInputChange} />
        <button onClick={handleButtonClick}>Submit</button>
        {errorMessage && <p>{errorMessage}</p>}
        {rating && <p>Overall Rating: {rating}</p>}
      </div>
    );
  };
  
  export default ViewAverage;