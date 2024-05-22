import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    // Fetch listing details
    fetch(`/api/listings/${id}`)
      .then(response => response.json())
      .then(data => setListing(data))
      .catch(error => console.error('Error fetching listing:', error));
  }, [id]);

  const handleSave = () => {
    // Update listing
    fetch(`/api/listings/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listing),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Listing updated:', data);
        navigate(`/properties/category/${data.category}`);
      })
      .catch(error => console.error('Error updating listing:', error));
  };

  if (!listing) return <div>Loading...</div>;

  return (
    <div className={`edit-listing ${theme}`}>
      <h1>Edit Listing</h1>
      <input
        type="text"
        value={listing.title}
        onChange={(e) => setListing({ ...listing, title: e.target.value })}
      />
      <textarea
        value={listing.description}
        onChange={(e) => setListing({ ...listing, description: e.target.value })}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditListing;
