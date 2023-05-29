import React, { useState } from 'react';
import AddDirectorForm from './db_manager/addDirector';
import AddAudienceForm from './db_manager/addAudience';
import DeleteAudienceForm from './db_manager/deleteAudience';
import UpdatePlatformIdForm from './db_manager/updatePlatform';
import ViewDirectors from './db_manager/viewDirectors';
import ViewMovies from './db_manager/viewMovies';
import ViewRatings from './db_manager/viewAverage';
import ViewAllRatings from './db_manager/viewRatings';

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
      <h2 style={{ fontFamily: 'Candara' }}>Welcome, DB Manager!</h2>
      <div>
        <button
          style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
          onClick={handleAddDirector}
        >
          Add Director
        </button>
        <button
          style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }}
          onClick={handleAddAudience}
        >
          Add Audience
        </button>
        <button
          style={{ backgroundColor: 'orange', color: 'white', marginRight: '10px' }}
          onClick={handleDeleteAudience}
        >
          Delete Audience
        </button>
        <button
          style={{ backgroundColor: 'purple', color: 'white', marginRight: '10px' }}
          onClick={handleUpdatePlatformId}
        >
          Update Platform ID
        </button>
        <button
          style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}
          onClick={handleViewDirectors}
        >
          View Directors
        </button>
        <button
          style={{ backgroundColor: 'teal', color: 'white', marginRight: '10px' }}
          onClick={handleViewRatings}
        >
          View Ratings
        </button>
        <button
          style={{ backgroundColor: 'yellow', color: 'black', marginRight: '10px' }}
          onClick={handleViewMoviesByDirector}
        >
          View Movies by Director
        </button>
        <button
          style={{ backgroundColor: 'pink', color: 'black', marginRight: '10px' }}
          onClick={handleViewAverageRating}
        >
          View Average Rating
        </button>
      </div>

      {showDirectorForm && <AddDirectorForm />}
      {showAudienceForm && <AddAudienceForm />}
      {showDeleteAudienceForm && <DeleteAudienceForm />}
      {showUpdatePlatformIdForm && <UpdatePlatformIdForm />}
      {showViewDirectors && <ViewDirectors />}
      {showViewMoviesByDirector && <ViewMovies />}
      {showViewAverageRating && <ViewRatings />}
      {showViewRatings && <ViewAllRatings />}
    </div>
  );
}

export default Dashboard;
