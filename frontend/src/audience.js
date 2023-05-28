import React, { useState } from 'react';
import BuyTicket from './audience/buyTicket';
import ListMovie from './audience/listMovie';
import ListTicket from './audience/listTicket';
function Dashboard() {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showListMovieForm, setShowListMovieForm] = useState(false);
  const [showListTicketForm, setShowListTicketForm] = useState(false);

  const handleBuyTicket = () => {
    setShowTicketForm(true);
    setShowListMovieForm(false);
    setShowListTicketForm(false);
  };

  const handleListMovie = () => {
    setShowTicketForm(false);
    setShowListMovieForm(true);
    setShowListTicketForm(false);
  };

  const handleListTicket = () => {
    setShowTicketForm(false);
    setShowListMovieForm(false);
    setShowListTicketForm(true);
  };

  

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'Candara' }}>Welcome, Audience!</h2>
      <div>
        <button
          style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
          onClick={handleBuyTicket}
        >
          Buy Ticket
        </button>
        <button
          style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }}
          onClick={handleListMovie}
        >
          List Movie
        </button>
        <button
          style={{ backgroundColor: 'orange', color: 'white', marginRight: '10px' }}
          onClick={handleListTicket}
        >
          List Ticket
        </button>
        
      </div>
      {showListMovieForm && <ListMovie />}
      {showListTicketForm && <ListTicket />}
      {showTicketForm && <BuyTicket />}
    </div>
  );
}

export default Dashboard;
