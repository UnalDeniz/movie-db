import React, { useState } from 'react';
import AddTheatre from './director/addTheatre';
import AddMovie from './director/addMovie';
function Dashboard() {
  const [showTheatreForm, setShowTheatreForm] = useState(false);
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [showDeleteAudienceForm, setShowDeleteAudienceForm] = useState(false);
  const [showUpdatePlatformIdForm, setShowUpdatePlatformIdForm] = useState(false);
  const [showViewDirectors, setShowViewDirectors] = useState(false);
  const [showViewRatings, setShowViewRatings] = useState(false);
  const [showViewMoviesByDirector, setShowViewMoviesByDirector] = useState(false);
  const [showViewAverageRating, setShowViewAverageRating] = useState(false);

  const handleAddTheatre = () => {
    setShowTheatreForm(true);
    setShowMovieForm(false);
    setShowDeleteAudienceForm(false);
    setShowUpdatePlatformIdForm(false);
    setShowViewDirectors(false);
    setShowViewRatings(false);
    setShowViewMoviesByDirector(false);
    setShowViewAverageRating(false);
  };

  const handleAddMovie = () => {
    setShowTheatreForm(false);
    setShowMovieForm(true);
    setShowDeleteAudienceForm(false);
    setShowUpdatePlatformIdForm(false);
    setShowViewDirectors(false);
    setShowViewRatings(false);
    setShowViewMoviesByDirector(false);
    setShowViewAverageRating(false);
  };

  const handleDeleteAudience = () => {
    setShowTheatreForm(false);
    setShowMovieForm(false);
    setShowDeleteAudienceForm(true);
    setShowUpdatePlatformIdForm(false);
    setShowViewDirectors(false);
    setShowViewRatings(false);
    setShowViewMoviesByDirector(false);
    setShowViewAverageRating(false);
  };

  const handleUpdatePlatformId = () => {
    setShowTheatreForm(false);
    setShowMovieForm(false);
    setShowDeleteAudienceForm(false);
    setShowUpdatePlatformIdForm(true);
    setShowViewDirectors(false);
    setShowViewRatings(false);
    setShowViewMoviesByDirector(false);
    setShowViewAverageRating(false);
  };

  const handleViewDirectors = () => {
    setShowTheatreForm(false);
    setShowMovieForm(false);
    setShowDeleteAudienceForm(false);
    setShowUpdatePlatformIdForm(false);
    setShowViewDirectors(true);
    setShowViewRatings(false);
    setShowViewMoviesByDirector(false);
    setShowViewAverageRating(false);
  };

  const handleViewRatings = () => {
    setShowTheatreForm(false);
    setShowMovieForm(false);
    setShowDeleteAudienceForm(false);
    setShowUpdatePlatformIdForm(false);
    setShowViewDirectors(false);
    setShowViewRatings(true);
    setShowViewMoviesByDirector(false);
    setShowViewAverageRating(false);
  };

  const handleViewMoviesByDirector = () => {
    setShowTheatreForm(false);
    setShowMovieForm(false);
    setShowDeleteAudienceForm(false);
    setShowUpdatePlatformIdForm(false);
    setShowViewDirectors(false);
    setShowViewRatings(false);
    setShowViewMoviesByDirector(true);
    setShowViewAverageRating(false);
  };

  const handleViewAverageRating = () => {
    setShowTheatreForm(false);
    setShowMovieForm(false);
    setShowDeleteAudienceForm(false);
    setShowUpdatePlatformIdForm(false);
    setShowViewDirectors(false);
    setShowViewRatings(false);
    setShowViewMoviesByDirector(false);
    setShowViewAverageRating(true);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'Candara' }}>Welcome, Director!</h2>
      <div>
        <button
          style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
          onClick={handleAddMovie}
        >
          List Theatres
        </button>
        <button
          style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }}
          onClick={handleAddMovie}
        >
          Add Movie
        </button>
        <button
          style={{ backgroundColor: 'orange', color: 'white', marginRight: '10px' }}
          onClick={handleAddTheatre}
        >
          Add Theatre
        </button>
        <button
          style={{ backgroundColor: 'purple', color: 'white', marginRight: '10px' }}
          onClick={handleUpdatePlatformId}
        >
          View Movies
        </button>
        <button
          style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}
          onClick={handleViewDirectors}
        >
          View All Audiences
        </button>
        <button
          style={{ backgroundColor: 'teal', color: 'white', marginRight: '10px' }}
          onClick={handleViewRatings}
        >
          Update Movie Name
        </button>
        <button
          style={{ backgroundColor: 'teal', color: 'white', marginRight: '10px' }}
          onClick={handleViewRatings}
        >
          Update Movie Name
        </button>
      </div>
      {showTheatreForm && <AddTheatre />}
      {showMovieForm && <AddMovie />}
    </div>
  );
}

export default Dashboard;
