import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BuyTicket() {
  const [session_id, setSession] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    setAccessToken(storedAccessToken);
  }, []);

  const handleFormSubmit = () => {
    const data = {
        session_id: session_id 
      };
      
      axios
        .post('http://localhost:3001/api/audience/buy_ticket', data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          console.log(response.data);
          setSuccessMessage('Ticket bought successfully!');
          resetForm();
          setErrorMessage(null); 
        })
        .catch(error => {
          console.error('Error buying ticket:', error);
          setErrorMessage('Failed to buy ticket.');
          setSuccessMessage(null); 
        });
  };

  const resetForm = () => {
    setSession('');
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
        placeholder="Session ID"
        value={session_id}
        onChange={e => setSession(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
}

export default BuyTicket;
