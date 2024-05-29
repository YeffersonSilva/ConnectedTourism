import React, { useState, useEffect } from "react";
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
    category: "",
    image: "" // Añadir campo de imagen
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/adminPublicaciones");
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched listings:", data);
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
      ? `http://localhost:3001/adminPublicaciones/${selectedListing._id}`
      : "http://localhost:3001/adminPublicaciones";
    const method = selectedListing ? "PATCH" : "POST";

    console.log(`Submitting form with method: ${method}, url: ${url}, data:`, formData);

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Form submission successful");
        fetchListings();
        setFormData({ title: "", description: "", price: "", category: "", image: "" });
        setSelectedListing(null);
      } else {
        throw new Error('Failed to perform the operation.');
      }
    } catch (err) {
      console.error("Failed to submit", err);
    }
  };

  const handleDelete = async (listingId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta publicación?");
    if (!confirmDelete) return;

    console.log(`Deleting listing with id: ${listingId}`);

    try {
      const response = await fetch(`http://localhost:3001/adminPublicaciones/${listingId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Listing with id ${listingId} deleted`);
        setListings(prevListings => prevListings.filter(listing => listing._id !== listingId));
      } else {
        const errorData = await response.json();
        console.error('Delete response not ok:', errorData);
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
      category: listing.category,
      image: listing.image || "" // Añadir campo de imagen
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
            <input
              name="image"
              value={formData.image}
              onChange={handleFormChange}
              placeholder="Image URL"
            />
            <button type="submit">
              {selectedListing ? "Update Listing" : "Add Listing"}
            </button>
          </form>
          <ul>
            {listings.map((listing) => (
              <li key={listing._id}>
                <div className="listing-details">
                  {listing.image && <img src={listing.image} alt={listing.title} />}
                  <div>{listing.title} - ${listing.price}</div>
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
