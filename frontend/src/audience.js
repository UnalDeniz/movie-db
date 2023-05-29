import React, { useState } from 'react';
import BuyTicket from './audience/buyTicket';
import ListMovie from './audience/listMovie';
import ListTicket from './audience/listTicket';
import RateMovie  from './audience/rateMovie';
function Dashboard() {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showListMovieForm, setShowListMovieForm] = useState(false);
  const [showListTicketForm, setShowListTicketForm] = useState(false);
  const [showRateMovieForm, setShowRateMovieForm] = useState(false);

  const handleBuyTicket = () => {
    setShowTicketForm(true);
    setShowListMovieForm(false);
    setShowListTicketForm(false);
    setShowRateMovieForm(false);
  };

  const handleListMovie = () => {
    setShowTicketForm(false);
    setShowListMovieForm(true);
    setShowListTicketForm(false);
    setShowRateMovieForm(false);
  };

  const handleListTicket = () => {
    setShowTicketForm(false);
    setShowListMovieForm(false);
    setShowListTicketForm(true);
    setShowRateMovieForm(false);
  };
  const handleRateMovie = () => {
    setShowTicketForm(false);
    setShowListMovieForm(false);
    setShowListTicketForm(false);
    setShowRateMovieForm(true);
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
        <button
          style={{ backgroundColor: 'orange', color: 'white', marginRight: '10px' }}
          onClick={handleRateMovie}
        >
          Rate Movie
        </button>
        
      </div>
      {showListMovieForm && <ListMovie />}
      {showListTicketForm && <ListTicket />}
      {showTicketForm && <BuyTicket />}
      {showRateMovieForm && <RateMovie />}
    </div>
  );
}

export default Dashboard;
