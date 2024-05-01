import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import "../styles/admin.scss";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/admin");
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = selectedUser
      ? `http://localhost:3001/admin/${selectedUser._id}`
      : "http://localhost:3001/admin";
    const method = selectedUser ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchUsers();
        setFormData({ firstName: "", lastName: "", email: "", password: "" });
        setSelectedUser(null);
      }
    } catch (err) {
      console.error("Failed to submit", err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/admin/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) fetchUsers();
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
    });
  };

  return (
    <div className="admin-page-container">
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>Admin User Management</h1>
          <form onSubmit={handleSubmit}>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleFormChange}
              placeholder="First Name"
              required
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleFormChange}
              placeholder="Last Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              placeholder="Password"
              required
            />
            <button type="submit">
              {selectedUser ? "Update User" : "Add User"}
            </button>
          </form>
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <div className="user-details">
                  {user.firstName} {user.lastName} - {user.email}
                </div>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
