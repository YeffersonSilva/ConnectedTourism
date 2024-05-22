import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import "../styles/admin.scss";

const AdminListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/properties");
      if (response.ok) {
        const data = await response.json();
        setListings(data);
        setLoading(false);
      } else {
        throw new Error('Failed to fetch listings from the server.');
      }
    } catch (err) {
      console.error("Failed to fetch listings", err);
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = selectedListing
      ? `http://localhost:3001/properties/${selectedListing._id}`
      : "http://localhost:3001/properties";
    const method = selectedListing ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchListings();
        setFormData({ title: "", description: "", price: "", category: "" });
        setSelectedListing(null);
      } else {
        throw new Error('Failed to perform the operation.');
      }
    } catch (err) {
      console.error("Failed to submit", err);
    }
  };

  const handleDelete = async (listingId) => {
    try {
      const response = await fetch(`http://localhost:3001/properties/${listingId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchListings();
      } else {
        throw new Error('Failed to delete the listing.');
      }
    } catch (err) {
      console.error("Failed to delete listing", err);
    }
  };

  const handleEdit = (listing) => {
    setSelectedListing(listing);
    setFormData({
      title: listing.title,
      description: listing.description,
      price: listing.price,
      category: listing.category
    });
  };

  return (
    <div className="admin-page-container">
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>Admin Listing Management</h1>
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              placeholder="Title"
              required
            />
            <input
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="Description"
              required
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleFormChange}
              placeholder="Price"
              required
            />
            <input
              name="category"
              value={formData.category}
              onChange={handleFormChange}
              placeholder="Category"
              required
            />
            <button type="submit">
              {selectedListing ? "Update Listing" : "Add Listing"}
            </button>
          </form>
          <ul>
            {listings.map((listing) => (
              <li key={listing._id}>
                <div className="listing-details">
                  {listing.title} - ${listing.price}
                </div>
                <button onClick={() => handleEdit(listing)}>Edit</button>
                <button onClick={() => handleDelete(listing._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminListingsPage;
