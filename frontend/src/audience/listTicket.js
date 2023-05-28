
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null); // Yeni hata durumu

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        if (token) {
          const response = await axios.get('http://localhost:3001/api/audience/list_ticket', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTickets(response.data.Tickets);
        }
      } catch (error) {
        setError("Failed to list tickets: " + error.message); // Hata durumunu ayarla
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Ticket List</h2>
      {error && <p>{error}</p>} {/* Hata durumunu yazdır */}
      {tickets.map((ticket, index) => (
        <div key={index}>
          <h3>Movie {ticket.movie_id}</h3>
          <p>Movie ID: {ticket.movie_id}</p>
          <p>Name: {ticket.movie_name}</p>
          <p>Director Surname: {ticket.session_id}</p>
          <p>Nation: {ticket.average_rating}</p>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
