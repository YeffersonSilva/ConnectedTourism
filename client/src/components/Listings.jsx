import { useEffect, useState } from "react";
import { categories } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import { useTheme } from '../contexts/ThemeContext'; // Asegura que useTheme esté importado

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const listings = useSelector((state) => state.listings);
  const { theme } = useTheme(); // Usar useTheme para obtener el tema actual

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
            booking=false
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
  );
};

export default Listings;
