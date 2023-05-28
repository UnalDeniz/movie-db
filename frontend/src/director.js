import React, { useState } from 'react';

function Dashboard() {
  const [showDirectorForm, setShowDirectorForm] = useState(false);
  const [showAudienceForm, setShowAudienceForm] = useState(false);
  const [showDeleteAudienceForm, setShowDeleteAudienceForm] = useState(false);
  const [showUpdatePlatformIdForm, setShowUpdatePlatformIdForm] = useState(false);
  const [showViewDirectors, setShowViewDirectors] = useState(false);
  const [showViewRatings, setShowViewRatings] = useState(false);
  const [showViewMoviesByDirector, setShowViewMoviesByDirector] = useState(false);
  const [showViewAverageRating, setShowViewAverageRating] = useState(false);

  const handleAddDirector = () => {
    setShowDirectorForm(true);
    setShowAudienceForm(false);
    setShowDeleteAudienceForm(false);
    setShowUpdatePlatformIdForm(false);
    setShowViewDirectors(false);
    setShowViewRatings(false);
    setShowViewMoviesByDirector(false);
    setShowViewAverageRating(false);
  };

  const handleAddAudience = () => {
    setShowDirectorForm(false);
    setShowAudienceForm(true);
    setShowDeleteAudienceForm(false);
    setShowUpdatePlatformIdForm(false);
    setShowViewDirectors(false);
    setShowViewRatings(false);
    setShowViewMoviesByDirector(false);
    setShowViewAverageRating(false);
  };

  const handleDeleteAudience = () => {
    setShowDirectorForm(false);
    setShowAudienceForm(false);
    setShowDeleteAudienceForm(true);
    setShowUpdatePlatformIdForm(false);
    setShowViewDirectors(false);
    setShowViewRatings(false);
    setShowViewMoviesByDirector(false);
    setShowViewAverageRating(false);
  };

  const handleUpdatePlatformId = () => {
    setShowDirectorForm(false);
    setShowAudienceForm(false);
    setShowDeleteAudienceForm(false);
    setShowUpdatePlatformIdForm(true);
    setShowViewDirectors(false);
    setShowViewRatings(false);
    setShowViewMoviesByDirector(false);
    setShowViewAverageRating(false);
  };

  const handleViewDirectors = () => {
    setShowDirectorForm(false);
    setShowAudienceForm(false);
    setShowDeleteAudienceForm(false);
    setShowUpdatePlatformIdForm(false);
    setShowViewDirectors(true);
    setShowViewRatings(false);
    setShowViewMoviesByDirector(false);
    setShowViewAverageRating(false);
  };

  const handleViewRatings = () => {
    setShowDirectorForm(false);
    setShowAudienceForm(false);
    setShowDeleteAudienceForm(false);
    setShowUpdatePlatformIdForm(false);
    setShowViewDirectors(false);
    setShowViewRatings(true);
    setShowViewMoviesByDirector(false);
    setShowViewAverageRating(false);
  };

  const handleViewMoviesByDirector = () => {
    setShowDirectorForm(false);
    setShowAudienceForm(false);
    setShowDeleteAudienceForm(false);
    setShowUpdatePlatformIdForm(false);
    setShowViewDirectors(false);
    setShowViewRatings(false);
    setShowViewMoviesByDirector(true);
    setShowViewAverageRating(false);
  };

  const handleViewAverageRating = () => {
    setShowDirectorForm(false);
    setShowAudienceForm(false);
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
          onClick={handleAddDirector}
        >
          List Theatres
        </button>
        <button
          style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }}
          onClick={handleAddAudience}
        >
          Add Movie
        </button>
        <button
          style={{ backgroundColor: 'orange', color: 'white', marginRight: '10px' }}
          onClick={handleDeleteAudience}
        >
          Add Predecessors
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
      </div>

    </div>
  );
}

export default Dashboard;
