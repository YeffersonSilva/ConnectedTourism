import React, { useState, useEffect } from 'react';
import { categories } from "../data";
import "../styles/Categories.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import ListingCard from "./ListingCard";
import Loader from "./Loader";

const Categories = () => {
  const { theme } = useTheme();
  const [animateKey, setAnimateKey] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const listings = useSelector((state) => state.listings);

  useEffect(() => {
    setAnimateKey(prevKey => prevKey + 1);
  }, [location.pathname]);

  const handleDelete = (id) => {
    fetch(`/api/listings/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        getFeedListings(); // Refrescar la lista después de eliminar
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:3001/properties?category=${selectedCategory}`
          : "http://localhost:3001/properties",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  return (
    <div className={`categories ${theme}`}>
      <motion.h1
        key={animateKey}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        Explora las Categorías Destacadas
      </motion.h1>
      <div className="categories_list">
        {categories?.slice(1, 7).map((category, index) => (
          <motion.div
            key={`${category.label}-${animateKey}`}
            className="category"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.4 }}
          >
            <Link to={`/properties/category/${category.label}`}>
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                <div className="category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </Link>
            <div className="category_actions">
              <IconButton onClick={() => navigate(`/edit/${category.id}`)}>
                <Edit sx={{ color: theme === 'dark' ? '#fff' : '#000' }} />
              </IconButton>
              <IconButton onClick={() => handleDelete(category.id)}>
                <Delete sx={{ color: theme === 'dark' ? '#fff' : '#000' }} />
              </IconButton>
            </div>
          </motion.div>
        ))}
      </div>
      <div className={`listings ${theme}`}>
        <div className="category-list">
          {categories?.map((category, index) => (
            <div
              className={`category ${category.label === selectedCategory ? "selected" : ""} ${theme}`}
              key={index}
              onClick={() => setSelectedCategory(category.label)}
            >
              <div className="category_icon">{category.icon}</div>
              <p>{category.label}</p>
            </div>
          ))}
        </div>
        {loading ? (
          <Loader />
        ) : (
          listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default Categories;
