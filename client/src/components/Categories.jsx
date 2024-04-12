import React from 'react';
import { categories } from "../data";
import "../styles/Categories.scss";
import { Link } from "react-router-dom";
import { useTheme } from '../contexts/ThemeContext'; // Importa useTheme

const Categories = () => {
  const { theme } = useTheme(); // Usa useTheme para obtener el tema actual

  return (
    <div className={`categories ${theme}`}> {/* Agrega la clase de tema aquí */}
      <h1>Explora las Categorías Destacadas</h1>
      <div className="categories_list">
        {categories?.slice(1, 7).map((category, index) => (
          <Link to={`/properties/category/${category.label}`} key={index}>
            <div className="category">
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                <div className="category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
