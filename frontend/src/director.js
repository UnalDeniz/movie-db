import React, { useState } from 'react';
import AddTheatre from './director/addTheatre';
import AddMovie from './director/addMovie';
import AddPredecessor from './director/addPredecessor';
import AddSession from './director/addSession';
import MovieList from './director/viewMovie';
function Dashboard() {
  const [showTheatreForm, setShowTheatreForm] = useState(false);
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [showPredecessorForm, setShowPredecessorForm] = useState(false);
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [showViewAudience, setShowViewAudience] = useState(false);
  const [showViewMovies, setShowViewMovies] = useState(false);
  const [showViewTheatres, setShowTheatres] = useState(false);
  const [showUpdateMovie, setShowUpdateMovie] = useState(false);

  const handleAddTheatre = () => {
    setShowTheatreForm(true);
    setShowMovieForm(false);
    setShowPredecessorForm(false);
    setShowSessionForm(false);
    setShowViewAudience(false);
    setShowViewMovies(false);
    setShowTheatres(false);
    setShowUpdateMovie(false);
  };

  const handleAddMovie = () => {
    setShowTheatreForm(false);
    setShowMovieForm(true);
    setShowPredecessorForm(false);
    setShowSessionForm(false);
    setShowViewAudience(false);
    setShowViewMovies(false);
    setShowTheatres(false);
    setShowUpdateMovie(false);
  };

  const handleAddPredecessor = () => {
    setShowTheatreForm(false);
    setShowMovieForm(false);
    setShowPredecessorForm(true);
    setShowSessionForm(false);
    setShowViewAudience(false);
    setShowViewMovies(false);
    setShowTheatres(false);
    setShowUpdateMovie(false);
  };

  const handleAddSession = () => {
    setShowTheatreForm(false);
    setShowMovieForm(false);
    setShowPredecessorForm(false);
    setShowSessionForm(true);
    setShowViewAudience(false);
    setShowViewMovies(false);
    setShowTheatres(false);
    setShowUpdateMovie(false);
  };

  const handleViewAudience = () => {
    setShowTheatreForm(false);
    setShowMovieForm(false);
    setShowPredecessorForm(false);
    setShowSessionForm(false);
    setShowViewAudience(true);
    setShowViewMovies(false);
    setShowTheatres(false);
    setShowUpdateMovie(false);
  };

  const handleViewMovies = () => {
    setShowTheatreForm(false);
    setShowMovieForm(false);
    setShowPredecessorForm(false);
    setShowSessionForm(false);
    setShowViewAudience(false);
    setShowViewMovies(true);
    setShowTheatres(false);
    setShowUpdateMovie(false);
  };

  const handleViewTheatres = () => {
    setShowTheatreForm(false);
    setShowMovieForm(false);
    setShowPredecessorForm(false);
    setShowSessionForm(false);
    setShowViewAudience(false);
    setShowViewMovies(false);
    setShowTheatres(true);
    setShowUpdateMovie(false);
  };

  const handleUpdateMovie = () => {
    setShowTheatreForm(false);
    setShowMovieForm(false);
    setShowPredecessorForm(false);
    setShowSessionForm(false);
    setShowViewAudience(false);
    setShowViewMovies(false);
    setShowTheatres(false);
    setShowUpdateMovie(true);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'Candara' }}>Welcome, Director!</h2>
      <div>
        <button
          style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
          onClick={handleAddTheatre}
        >
          Add Theatre
        </button>
        <button
          style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }}
          onClick={handleAddMovie}
        >
          Add Movie
        </button>
        <button
          style={{ backgroundColor: 'orange', color: 'white', marginRight: '10px' }}
          onClick={handleAddPredecessor}
        >
          Add Predecessor
        </button>
        <button
          style={{ backgroundColor: 'purple', color: 'white', marginRight: '10px' }}
          onClick={handleAddSession}
        >
          Add Session
        </button>
        <button
          style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}
          onClick={handleViewAudience}
        >
          View All Audiences
        </button>
        <button
          style={{ backgroundColor: 'teal', color: 'white', marginRight: '10px' }}
          onClick={handleViewMovies}
        >
          View Movies
        </button>
        <button
          style={{ backgroundColor: 'yellow', color: 'black', marginRight: '10px' }}
          onClick={handleViewTheatres}
        >
          View Theatres
        </button>
        <button
          style={{ backgroundColor: 'pink', color: 'black', marginRight: '10px' }}
          onClick={handleUpdateMovie}
        >
          Update Movie
        </button>
      </div>
      {showTheatreForm && <AddTheatre />}
      {showMovieForm && <AddMovie />}
      {showPredecessorForm && <AddPredecessor />}
      {showSessionForm && <AddSession />}
      {showViewMovies && <MovieList />}
    </div>
  );
}

export default Dashboard;
